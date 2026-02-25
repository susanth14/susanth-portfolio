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

console.log('✓ Images optimized to WebP')
