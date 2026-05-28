# From Swept Contact to Pose

Project page for:

**From swept contact to pose: Probe-aware registration via complementary-shape docking**

This repository is a static-export Next.js site intended for GitHub Pages.
It also includes a root `index.html` fallback that can be served directly if
you prefer a no-build GitHub Pages setup.

## Local Development

```bash
npm install
npm run dev
```

## Static Build

```bash
npm run build
```

The exported site is written to `out/`.

## GitHub Pages

For a project page hosted under `https://<user>.github.io/icra26-conreg/`, set:

```bash
NEXT_PUBLIC_BASE_PATH=/icra26-conreg
```

The included GitHub Actions workflow already sets this value during deployment.

If you deploy to a custom domain or a user site root, remove the environment
variable from `.github/workflows/deploy.yml`.

For the no-build fallback, configure GitHub Pages to deploy from the repository
root. The fallback uses the same assets and styling as the Next.js page.
