# Workrigly

Workrigly is an English, static-first website about free, open-source, and self-hosted alternatives to paid software.

## Local development

```powershell
npm install
npm run dev
```

The local server rebuilds the site and serves `dist/` at `http://localhost:4173`.

## Build and verify

```powershell
npm test
```

The build has no runtime dependency: Cloudflare Pages serves the generated files in `dist/`.

## Deploy

One command verifies the site, commits the change, pushes `main`, waits for the connected Cloudflare Pages build, and runs public smoke tests:

```powershell
.\scripts\deploy.ps1 -Message "Describe the change"
```

The command requires authenticated `git` and GitHub CLI access. Cloudflare Pages is connected to the public repository and deploys every pushed commit automatically.
