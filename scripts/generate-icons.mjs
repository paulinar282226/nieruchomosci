import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'

// Pink house icon SVG
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#d4a0a0"/>
  <polygon points="50,15 85,45 75,45 75,82 25,82 25,45 15,45" fill="#fff5f5" stroke="#4a3b3b" stroke-width="2"/>
  <rect x="40" y="60" width="20" height="22" fill="#4a3b3b" rx="2"/>
  <rect x="32" y="48" width="15" height="12" fill="#d4a0a0" rx="2" opacity="0.8"/>
  <rect x="53" y="48" width="15" height="12" fill="#d4a0a0" rx="2" opacity="0.8"/>
</svg>`

// Maskable icon (more padding, full bleed background)
const svgMaskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#d4a0a0"/>
  <polygon points="50,18 82,46 73,46 73,80 27,80 27,46 18,46" fill="#fff5f5" stroke="#4a3b3b" stroke-width="2"/>
  <rect x="40" y="58" width="20" height="22" fill="#4a3b3b" rx="2"/>
  <rect x="30" y="47" width="14" height="11" fill="#f0c0c0" rx="2"/>
  <rect x="56" y="47" width="14" height="11" fill="#f0c0c0" rx="2"/>
</svg>`

const publicDir = './public'
const sizes = [192, 512]

async function generate() {
  for (const size of sizes) {
    const buffer = Buffer.from(svgIcon)
    await sharp(buffer).resize(size, size).png().toFile(`${publicDir}/icon-${size}x${size}.png`)
    console.log(`Generated icon-${size}x${size}.png`)

    const bufferM = Buffer.from(svgMaskable)
    await sharp(bufferM)
      .resize(size, size)
      .png()
      .toFile(`${publicDir}/icon-maskable-${size}x${size}.png`)
    console.log(`Generated icon-maskable-${size}x${size}.png`)
  }
  console.log('All icons generated!')
}

generate().catch(console.error)
