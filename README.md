# Asad Rizvi — Ops Console Portfolio

A personal portfolio built as a **live operations console** — the medium is the message:
a full-stack engineer who builds the software that runs real operations, presented as
a real-time ops dashboard.

## Stack

React 18 · Vite · Tailwind CSS · Framer Motion · ApexCharts

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Content

All copy (profile, skills, projects, career) lives in a single file —
[`src/data/portfolio.js`](src/data/portfolio.js). Edit there; components read from it.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages. Set the repo's **Settings → Pages → Source** to
**GitHub Actions**. The Vite `base` is relative (`./`), so it works at any repo path.
