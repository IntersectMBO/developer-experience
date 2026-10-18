# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

The website standardises on **npm** — it is the only package manager CI installs with (`npm ci` from `website/package-lock.json`, the only tracked lockfile).

### Installation

```
$ npm install
```

### Local Development

```
$ npm run start:dev
```

Note: `npm start` is not the dev server — it runs a full production build and serves that, so use `start:dev` while developing.

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Deployment is handled by the Deploy to GitHub Pages workflow (`.github/workflows/deploy.yml`), which runs on every push to `main` that touches `website/`. There is no manual deploy step — do not push to `gh-pages` by hand, as that bypasses the workflow.

### Security

Run dependency audits with `npm run audit`. See [SECURITY.md](./SECURITY.md) for how we verify and fix dependency security issues.
