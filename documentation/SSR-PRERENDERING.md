# SSR Pre-Rendering Documentation

## Overview

This portfolio is built with **React 19 + Vite 7** as a Single Page Application (SPA). By default, SPAs serve an almost-empty HTML file and render all content using JavaScript in the browser. This causes two problems:

1. **SEO** — Search engine crawlers that don't execute JavaScript see no page content.
2. **View Source** — When a user presses `Ctrl+U` (View Page Source), they only see `<div id="root"></div>` with no real content.

To solve both problems, a **build-time pre-rendering** (also called Static Site Generation / SSG) step is added. It renders the React app to an HTML string on the server, then injects that HTML into `dist/index.html` before deployment.

---

## How It Works — Step by Step

### The Normal SPA Flow (Without Pre-rendering)

```
Browser requests /
  → Server returns index.html  (contains empty <div id="root"></div>)
  → Browser downloads JS bundles
  → React boots and renders the UI into #root
  → Page becomes visible
```

**Problem:** View source only shows the empty `<div id="root"></div>`.

---

### The Pre-rendered Flow (With Pre-rendering)

```
npm run build:prod
  → Step 1: vite build  →  creates dist/ with all JS/CSS bundles + empty index.html
  → Step 2: node prerender.mjs
       → Starts a Vite SSR server in Node.js
       → Loads src/entry-server.jsx via ssrLoadModule
       → Calls renderToString(<App />) to produce a full HTML string
       → Reads dist/index.html
       → Replaces <div id="root"></div> with <div id="root">{HTML content}</div>
       → Writes the updated file back to dist/index.html

Browser requests /
  → Server returns index.html  (now contains full rendered HTML)
  → Browser shows content immediately (no JS needed for initial paint)
  → React boots and "hydrates" the existing HTML (attaches event listeners)
  → Page is interactive
```

**Result:** View source now shows the complete page content.

---

## File Structure

```
susanth-portfolio/
├── src/
│   ├── entry-server.jsx      ← SSR entry point used by prerender.mjs
│   ├── main.jsx              ← Client-side entry point (React hydration)
│   └── App.jsx               ← Root React component
├── prerender.mjs             ← Build-time pre-rendering script
├── index.html                ← HTML template (source)
├── dist/
│   └── index.html            ← Output HTML (injected with pre-rendered content)
└── package.json              ← build:prod script
```

---

## Key Files Explained

### 1. `src/entry-server.jsx`

```jsx
import { renderToString } from 'react-dom/server'
import App from './App'

export function render() {
  return renderToString(<App />)
}
```

**What it does:**
- This is the **server-side entry point** — separate from `main.jsx` which is the client-side entry.
- `renderToString()` is a React DOM Server API that renders a React component tree into a plain HTML string synchronously.
- It does **not** attach any event listeners or run browser-specific code — it purely generates the HTML markup.
- The `render()` function is exported so `prerender.mjs` can call it.

**Why separate from `main.jsx`?**
- `main.jsx` uses `ReactDOM.createRoot().render()` which requires a real DOM (browser only).
- `entry-server.jsx` uses `renderToString()` which works in Node.js (no DOM required).

---

### 2. `prerender.mjs`

```js
import { createServer } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
```

**Step A — Browser Global Polyfills**

```js
global.window = {
  matchMedia: () => ({ matches: false, addListener: () => {}, ... }),
  scrollY: 0,
  addEventListener: () => {},
  removeEventListener: () => {},
}
global.document = {
  documentElement: { classList: { add: () => {}, remove: () => {} } },
  getElementById: () => null,
  querySelector: () => null,
}
global.localStorage = { getItem: () => null, setItem: () => {} }
global.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} }
global.ResizeObserver   = class { observe() {} unobserve() {} disconnect() {} }
```

**Why are polyfills needed?**

React components in this project use browser-only APIs:
- `window.matchMedia` — used by dark mode detection
- `localStorage` — used to persist dark mode preference
- `IntersectionObserver` — used by Framer Motion's `useInView` hook
- `ResizeObserver` — used internally by Framer Motion
- `document.querySelector` — used by scroll navigation

Node.js has **none** of these by default. Without polyfills, `renderToString` would crash with `ReferenceError: window is not defined`.

The polyfills provide **stub (empty) implementations** — just enough to prevent crashes during rendering, without actually doing anything.

---

**Step B — Start Vite in SSR Mode**

```js
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})
```

- `middlewareMode: true` — starts Vite without spinning up an HTTP server (no port needed).
- `appType: 'custom'` — tells Vite we're handling the request/response ourselves.
- This gives us access to `vite.ssrLoadModule()` which can import JSX/ESM files in Node.js.

---

**Step C — Load the SSR Module and Render**

```js
const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')
const appHtml = render()
```

- `ssrLoadModule()` transforms the JSX file using Vite's SSR pipeline (Babel, etc.) and loads it into Node.js.
- `render()` calls `renderToString(<App />)` and returns the full HTML string of the portfolio.

---

**Step D — Inject HTML into the Template**

```js
const template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8')
const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
fs.writeFileSync(path.resolve(__dirname, 'dist/index.html'), html)
```

- Reads the built `dist/index.html` (which still has the empty `<div id="root"></div>`).
- Replaces it with the full rendered HTML string.
- Writes the updated file back — this is the final file that gets deployed.

---

**Step E — Cleanup**

```js
} finally {
  await vite.close()
}
```

- Always closes the Vite dev server after rendering, whether it succeeded or failed.

---

### 3. `package.json` — Build Scripts

```json
"scripts": {
  "dev":        "vite",
  "build":      "vite build",
  "build:prod": "vite build && node prerender.mjs",
  "preview":    "vite preview"
}
```

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (CSR only, no pre-rendering) |
| `npm run build` | Build JS/CSS bundles only (no pre-rendering) |
| `npm run build:prod` | Build + pre-render (use this for deployment) |
| `npm run preview` | Preview the built `dist/` folder locally |

> **Always use `npm run build:prod` before deploying** to ensure the HTML has pre-rendered content.

---

## Client-Side Hydration

After the pre-rendered HTML is served to the browser, React takes over via `main.jsx`:

```jsx
// src/main.jsx
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

This process is called **hydration**:
1. Browser receives the pre-rendered HTML → page is visually complete immediately.
2. React downloads and boots from the JS bundle.
3. React "hydrates" the existing DOM — it attaches event listeners and state without re-rendering.
4. The page is now fully interactive.

---

## SEO Benefits

### Before Pre-rendering (CSR only)
```html
<!-- View Source shows: -->
<div id="root"></div>
<!-- No content visible to crawlers or view-source -->
```

### After Pre-rendering
```html
<!-- View Source shows: -->
<div id="root">
  <section id="home">
    <h1>Susanth Jegadeesan</h1>
    <span>Manual Testing Engineer</span>
    <p>QA Test Engineer with expertise in Playwright automation...</p>
    ...
  </section>
  <section id="experience">
    <h3>Manual QA Test Engineer</h3>
    <p>Skillmine Technology Pvt Ltd</p>
    ...
  </section>
  <!-- All sections fully rendered -->
</div>
```

---

## CDN & Performance Configuration

### `public/_headers` (Cloudflare Pages)

```
# Hashed JS/CSS bundles — cache forever (content hash in filename)
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Profile image — cache for 7 days
/image.png
  Cache-Control: public, max-age=604800

# HTML — always revalidate (so users get latest on deploy)
/
  Cache-Control: public, max-age=0, must-revalidate
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

# SEO files — cache for 1 day
/robots.txt
/sitemap.xml
  Cache-Control: public, max-age=86400
```

**Why `immutable` for assets?**
Vite adds a content hash to every JS/CSS filename (e.g., `vendor-Bl6jAG7G.js`). When code changes, the hash changes, so the old cache is automatically invalidated. `immutable` tells the browser it never needs to revalidate these files.

---

## PageSpeed Optimizations in `index.html`

### LCP Image Preload
```html
<link rel="preload" as="image" href="/image.png" fetchpriority="high" />
```
The profile photo is the **Largest Contentful Paint (LCP)** element. Preloading it tells the browser to download it as early as possible, improving LCP score.

### Non-Render-Blocking Fonts
```html
<!-- Preload hint -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?..." />

<!-- Load as print media first (non-blocking), then swap to all -->
<link href="https://fonts.googleapis.com/css2?..." rel="stylesheet" media="print" onload="this.media='all'" />

<!-- Fallback for no-JS -->
<noscript><link href="https://fonts.googleapis.com/css2?..." rel="stylesheet" /></noscript>
```
Google Fonts loaded normally blocks rendering. The `media="print"` trick loads the font stylesheet off the critical path — the browser fetches it without blocking the page render, then `onload` switches `media` to `all` to apply the font.

### `fetchPriority` on Hero Image
```jsx
<img src="/image.png" fetchPriority="high" decoding="async" />
```
Tells the browser this image is high-priority (it's the LCP element) and to decode it asynchronously off the main thread.

---

## Vite Code Splitting (`vite.config.js`)

```js
manualChunks(id) {
  if (id.includes('react-dom') || id.includes('/react/')) return 'vendor'
  if (id.includes('framer-motion'))                         return 'motion'
  if (id.includes('react-icons'))                           return 'icons'
}
```

Splits the JS bundle into 4 chunks:

| Chunk | Contents | Size (gzip) |
|---|---|---|
| `vendor` | react + react-dom | ~60 KB |
| `motion` | framer-motion | ~41 KB |
| `icons` | react-icons | ~10 KB |
| `index` | application code | ~9 KB |

**Benefits:**
- Browsers can cache each chunk independently.
- If only app code changes, users only re-download `index.js` (~9 KB), not the full bundle.
- Parallel downloads — multiple chunks download simultaneously.

---

## Deployment Checklist

1. Run `npm run build:prod` (NOT `npm run build`)
2. Verify `dist/index.html` contains your name and content
3. Deploy the `dist/` folder to Cloudflare Pages
4. Verify by visiting your live URL and pressing `Ctrl+U`

---

## Common Issues

| Issue | Cause | Fix |
|---|---|---|
| `ReferenceError: window is not defined` | A component uses a browser API not polyfilled | Add the missing API to the polyfills in `prerender.mjs` |
| Pre-render output is empty | `renderToString` silently failed | Check the catch block output; add more polyfills |
| Content appears then disappears | Hydration mismatch | Ensure server and client render the same initial state |
| Fonts not loading after deployment | Non-blocking font trick | Check the `onload` attribute is not stripped by your deploy pipeline |
