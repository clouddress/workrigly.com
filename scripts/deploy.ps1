[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw "Git is required."
}

if (-not (Test-Path "node_modules/.bin/wrangler.cmd")) {
    throw "Dependencies are missing. Run npm install first."
}

$Status = git status --porcelain
if ($LASTEXITCODE -ne 0) { throw "Unable to read Git status." }
if ($Status) {
    throw "Deployment stopped: commit the current changes first so every deployment has a Git record."
}

$Branch = git branch --show-current
$Commit = git rev-parse HEAD
git merge-base --is-ancestor $Commit "origin/$Branch"
if ($LASTEXITCODE -ne 0) {
    throw "Deployment stopped: push commit $Commit to origin/$Branch first."
}

npm test
if ($LASTEXITCODE -ne 0) { throw "Build verification failed." }

& "node_modules/.bin/wrangler.cmd" pages deploy dist --project-name workrigly --branch $Branch --commit-hash $Commit
if ($LASTEXITCODE -ne 0) { throw "Cloudflare Pages deployment failed." }

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

Write-Host "Deployment and public smoke tests passed for commit $Commit."
