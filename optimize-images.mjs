import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const inputPath = path.resolve(__dirname, 'public/image.png')

if (!fs.existsSync(inputPath)) {
  console.log('No public/image.png found, skipping image optimization')
  process.exit(0)
}

// Hero avatar: 400x400 WebP (displayed at 144px — 2x for retina)
await sharp(inputPath)
  .resize(400, 400, { fit: 'cover', position: 'top' })
  .webp({ quality: 85 })
  .toFile(path.resolve(__dirname, 'public/image.webp'))

// OG Banner image: 1200x630 for WhatsApp / Teams / Slack / Twitter previews
// Profile photo on left, dark green branded background
const profileBuffer = await sharp(inputPath)
  .resize(420, 420, { fit: 'cover', position: 'top' })
  .png()
  .toBuffer()

const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050a07"/>
      <stop offset="100%" stop-color="#0a1a0c"/>
    </linearGradient>
    <clipPath id="circle-clip">
      <circle cx="210" cy="315" r="195"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative blobs -->
  <circle cx="100" cy="100" r="280" fill="#16a34a" opacity="0.07"/>
  <circle cx="1150" cy="580" r="350" fill="#4ade80" opacity="0.05"/>
  <circle cx="700" cy="0" r="200" fill="#16a34a" opacity="0.04"/>

  <!-- Vertical divider -->
  <line x1="460" y1="100" x2="460" y2="530" stroke="#16a34a" stroke-width="1.5" opacity="0.4"/>

  <!-- Profile photo circle background -->
  <circle cx="210" cy="315" r="200" fill="#16a34a" opacity="0.15"/>
  <circle cx="210" cy="315" r="198" fill="none" stroke="#4ade80" stroke-width="2" opacity="0.5"/>

  <!-- Name -->
  <text x="520" y="240" font-family="Arial, sans-serif" font-size="58" font-weight="bold" fill="white" letter-spacing="-1">Susanth Jegadeesan</text>

  <!-- Green underline -->
  <rect x="520" y="258" width="580" height="3" rx="2" fill="#4ade80" opacity="0.8"/>

  <!-- Title -->
  <text x="520" y="318" font-family="Arial, sans-serif" font-size="30" fill="#4ade80" font-weight="600">QA Test Engineer &amp; Front-End Developer</text>

  <!-- Skills row -->
  <text x="520" y="370" font-family="Arial, sans-serif" font-size="22" fill="#86efac" opacity="0.9">Playwright  ·  Manual Testing  ·  React.js</text>

  <!-- Company -->
  <text x="520" y="420" font-family="Arial, sans-serif" font-size="20" fill="#6b7280">Skillmine Technology Pvt Ltd</text>

  <!-- Domain -->
  <rect x="520" y="470" width="180" height="40" rx="8" fill="#16a34a" opacity="0.2"/>
  <rect x="520" y="470" width="180" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1" opacity="0.5"/>
  <text x="610" y="496" font-family="Arial, sans-serif" font-size="20" fill="#4ade80" text-anchor="middle" font-weight="600">susanthj.in</text>
</svg>`

await sharp(Buffer.from(ogSvg))
  .composite([{
    input: profileBuffer,
    top: 105,
    left: 0,
    blend: 'over',
  }])
  .png({ quality: 90 })
  .toFile(path.resolve(__dirname, 'public/og-image.png'))

console.log('✓ Images optimized — WebP avatar + OG banner created')
