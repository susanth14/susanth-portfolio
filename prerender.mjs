import { createServer } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Polyfill browser globals so React + Framer Motion render without errors
global.window = {
  matchMedia: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
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
global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')
  const appHtml = render()

  let template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8')

  // Inject <link rel="preload"> for the hashed CSS bundle to reduce render-blocking impact
  const cssMatch = template.match(/href="(\/assets\/index-[^"]+\.css)"/)
  if (cssMatch) {
    const preloadTag = `<link rel="preload" as="style" href="${cssMatch[1]}" />\n    `
    template = template.replace('<link rel="stylesheet"', preloadTag + '<link rel="stylesheet"')
  }

  const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  fs.writeFileSync(path.resolve(__dirname, 'dist/index.html'), html)
  console.log('✓ Pre-render complete — content is now visible in page source')
} catch (e) {
  console.error('✗ Pre-render failed:', e.message)
  process.exit(1)
} finally {
  await vite.close()
}
