# emberterm-web

Landing page for [EmberTerm](https://github.com/emberterm/emberterm), an open source terminal for Windows and macOS.
Live at https://emberterm.github.io.

Static [Astro](https://astro.build) site. No analytics or trackers; the only external request from the page is Google Fonts.

## Develop

Requires Node.js 22+ and pnpm.

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm check    # type check
pnpm build    # static output in dist/
```

## How the version is chosen

`src/release.ts` asks the GitHub API for the latest `emberterm/emberterm` release at build time and builds the
`.exe`, `.msi` and `.dmg` download URLs and installer sizes from it. The build fails if one of those assets is missing
from the release. If the API is unreachable, it uses the pinned `FALLBACK_VERSION` and hides the sizes.

The site only picks up a new release when it is rebuilt (see below).

## Deploy (GitHub Pages)

This repo is `emberterm/emberterm.github.io`, the organization site, served from the root. `.github/workflows/deploy.yml`
builds and publishes `dist/` on:

- a push to `main`;
- a `release-published` dispatch, sent by the Release workflow in `emberterm/emberterm` once every installer is uploaded
  (pre-releases skip it);
- a daily run, as a backstop if a dispatch is missed;
- a manual run (Actions → Deploy → Run workflow).

Setup, once: Settings → Pages → Source: GitHub Actions. The dispatch needs the secret `SITE_DISPATCH_TOKEN` in
`emberterm/emberterm`: a fine-grained token limited to this repo with Contents: read and write.

## Structure

```
src/release.ts        version, download URLs, sizes
src/lib/content.ts    copy, themes, ember sparks
src/lib/demo.ts       typing-terminal state machine
src/components/       one component per section
src/styles/global.css design tokens, buttons, keyframes
```

Animations respect `prefers-reduced-motion`: the typing terminal shows a static finished frame and the theme
switcher stops auto-cycling.
