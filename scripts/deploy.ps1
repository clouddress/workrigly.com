[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$Message
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

foreach ($Command in @("git", "gh", "npm", "curl.exe")) {
    if (-not (Get-Command $Command -ErrorAction SilentlyContinue)) {
        throw "$Command is required."
    }
}

npm test
if ($LASTEXITCODE -ne 0) { throw "Build verification failed." }

git add --all
if ($LASTEXITCODE -ne 0) { throw "Unable to stage project changes." }

git diff --cached --quiet
$DiffExitCode = $LASTEXITCODE
if ($DiffExitCode -eq 0) {
    throw "Deployment stopped: there are no changes to commit."
}
if ($DiffExitCode -ne 1) {
    throw "Unable to inspect staged changes."
}

git commit -m $Message
if ($LASTEXITCODE -ne 0) { throw "Git commit failed." }

$Branch = git branch --show-current
$Commit = git rev-parse HEAD
$Repository = gh repo view --json nameWithOwner --jq .nameWithOwner
if ($LASTEXITCODE -ne 0 -or -not $Repository) { throw "Unable to identify the GitHub repository." }

git push origin $Branch
if ($LASTEXITCODE -ne 0) { throw "Git push failed." }

Write-Host "Waiting for Cloudflare Pages to deploy commit $Commit..."
$DeploymentComplete = $false
for ($Attempt = 1; $Attempt -le 36; $Attempt++) {
    $CheckRunsJson = gh api -H "Accept: application/vnd.github+json" "repos/$Repository/commits/$Commit/check-runs"
    if ($LASTEXITCODE -ne 0) { throw "Unable to read GitHub check runs." }

    $CheckRuns = ($CheckRunsJson | ConvertFrom-Json).check_runs
    $CloudflareCheck = $CheckRuns | Where-Object { $_.name -eq "Cloudflare Pages" } | Select-Object -First 1

    if ($CloudflareCheck -and $CloudflareCheck.status -eq "completed") {
        if ($CloudflareCheck.conclusion -ne "success") {
            throw "Cloudflare Pages finished with: $($CloudflareCheck.conclusion)."
        }
        $DeploymentComplete = $true
        break
    }

    Start-Sleep -Seconds 5
}

if (-not $DeploymentComplete) {
    throw "Timed out waiting for Cloudflare Pages. Check the deployment dashboard."
}

$Checks = @(
    @{ Name = "Homepage"; Url = "https://workrigly.com/"; Expected = 200 },
    @{ Name = "robots.txt"; Url = "https://workrigly.com/robots.txt"; Expected = 200 },
    @{ Name = "sitemap.xml"; Url = "https://workrigly.com/sitemap.xml"; Expected = 200 },
    @{ Name = "404"; Url = "https://workrigly.com/this-page-must-not-exist"; Expected = 404 }
)

foreach ($Check in $Checks) {
    $Code = curl.exe --silent --show-error --location --output NUL --write-out "%{http_code}" $Check.Url
    if ($Code -ne [string]$Check.Expected) {
        throw "$($Check.Name) returned HTTP $Code; expected $($Check.Expected)."
    }
    Write-Host "$($Check.Name): PASS ($Code)"
}

$HttpCode = curl.exe --silent --show-error --output NUL --write-out "%{http_code}" http://workrigly.com/
if ($HttpCode -ne "301") { throw "HTTP apex redirect returned $HttpCode; expected 301." }

$WwwCode = curl.exe --silent --show-error --output NUL --write-out "%{http_code}" https://www.workrigly.com/
if ($WwwCode -ne "301") { throw "WWW redirect returned $WwwCode; expected 301." }

Write-Host "Deployment and public smoke tests passed for commit $Commit."
