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

Deployments must come from a clean, pushed Git commit:

```powershell
.\scripts\deploy.ps1
```

The script builds, verifies, confirms that the current commit exists on `origin`, deploys `dist/` to the `workrigly` Cloudflare Pages project, and smoke-tests the public domain.

