import sharp from 'sharp'
import { mkdirSync, existsSync } from 'fs'

if (!existsSync('./public/screenshots')) {
  mkdirSync('./public/screenshots')
}

// Desktop screenshot: 1280x720 - pink/beige gradient with house layout mockup
const desktopSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff5f5"/>
      <stop offset="100%" stop-color="#fce8e8"/>
    </linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <!-- Navbar -->
  <rect width="1280" height="64" fill="#d4a0a0"/>
  <text x="40" y="42" font-family="sans-serif" font-size="22" font-weight="bold" fill="#4a3b3b">nieruchomości-online.pl</text>
  <!-- Hero area -->
  <rect x="0" y="64" width="1280" height="280" fill="#4a3b3b" opacity="0.08"/>
  <text x="640" y="180" font-family="sans-serif" font-size="40" font-weight="bold" fill="#4a3b3b" text-anchor="middle">Znajdź swoje wymarzone mieszkanie</text>
  <text x="640" y="230" font-family="sans-serif" font-size="20" fill="#7a5c5c" text-anchor="middle">Ponad 1000 ogłoszeń w całej Polsce</text>
  <!-- Search box -->
  <rect x="240" y="260" width="800" height="60" rx="12" fill="white" opacity="0.9"/>
  <text x="350" y="297" font-family="sans-serif" font-size="16" fill="#aaa">Wpisz miasto...</text>
  <rect x="920" y="268" width="100" height="44" rx="8" fill="#d4a0a0"/>
  <text x="970" y="297" font-family="sans-serif" font-size="16" fill="white" text-anchor="middle">Szukaj</text>
  <!-- Cards row -->
  <rect x="40" y="380" width="380" height="280" rx="12" fill="white" opacity="0.85"/>
  <rect x="40" y="380" width="380" height="160" rx="12" fill="#d4a0a0" opacity="0.5"/>
  <text x="60" y="570" font-family="sans-serif" font-size="18" font-weight="bold" fill="#4a3b3b">Mieszkanie 3-pokojowe</text>
  <text x="60" y="598" font-family="sans-serif" font-size="16" fill="#7a5c5c">Warszawa, Mokotów · 65 m²</text>
  <text x="60" y="626" font-family="sans-serif" font-size="20" font-weight="bold" fill="#d4a0a0">750 000 zł</text>

  <rect x="450" y="380" width="380" height="280" rx="12" fill="white" opacity="0.85"/>
  <rect x="450" y="380" width="380" height="160" rx="12" fill="#b67272" opacity="0.4"/>
  <text x="470" y="570" font-family="sans-serif" font-size="18" font-weight="bold" fill="#4a3b3b">Kawalerka w centrum</text>
  <text x="470" y="598" font-family="sans-serif" font-size="16" fill="#7a5c5c">Kraków, Stare Miasto · 30 m²</text>
  <text x="470" y="626" font-family="sans-serif" font-size="20" font-weight="bold" fill="#d4a0a0">380 000 zł</text>

  <rect x="860" y="380" width="380" height="280" rx="12" fill="white" opacity="0.85"/>
  <rect x="860" y="380" width="380" height="160" rx="12" fill="#c48080" opacity="0.45"/>
  <text x="880" y="570" font-family="sans-serif" font-size="18" font-weight="bold" fill="#4a3b3b">Dom z ogrodem</text>
  <text x="880" y="598" font-family="sans-serif" font-size="16" fill="#7a5c5c">Wrocław, Krzyki · 120 m²</text>
  <text x="880" y="626" font-family="sans-serif" font-size="20" font-weight="bold" fill="#d4a0a0">1 200 000 zł</text>
</svg>`

// Mobile screenshot: 390x844
const mobileSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="390" height="844" viewBox="0 0 390 844">
  <defs>
    <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fff5f5"/>
      <stop offset="100%" stop-color="#fce8e8"/>
    </linearGradient>
  </defs>
  <rect width="390" height="844" fill="url(#bg2)"/>
  <!-- Navbar -->
  <rect width="390" height="56" fill="#d4a0a0"/>
  <text x="20" y="36" font-family="sans-serif" font-size="16" font-weight="bold" fill="#4a3b3b">nieruchomości-online.pl</text>
  <!-- Hero -->
  <rect x="0" y="56" width="390" height="200" fill="#4a3b3b" opacity="0.08"/>
  <text x="195" y="130" font-family="sans-serif" font-size="22" font-weight="bold" fill="#4a3b3b" text-anchor="middle">Znajdź wymarzone</text>
  <text x="195" y="158" font-family="sans-serif" font-size="22" font-weight="bold" fill="#4a3b3b" text-anchor="middle">mieszkanie</text>
  <!-- Search -->
  <rect x="20" y="200" width="350" height="46" rx="10" fill="white" opacity="0.9"/>
  <text x="40" y="230" font-family="sans-serif" font-size="14" fill="#aaa">Wpisz miasto...</text>
  <!-- Cards -->
  <rect x="20" y="280" width="350" height="240" rx="12" fill="white" opacity="0.9"/>
  <rect x="20" y="280" width="350" height="130" rx="12" fill="#d4a0a0" opacity="0.5"/>
  <text x="40" y="440" font-family="sans-serif" font-size="16" font-weight="bold" fill="#4a3b3b">Mieszkanie 3-pokojowe</text>
  <text x="40" y="466" font-family="sans-serif" font-size="13" fill="#7a5c5c">Warszawa · 65 m²</text>
  <text x="40" y="494" font-family="sans-serif" font-size="18" font-weight="bold" fill="#d4a0a0">750 000 zł</text>

  <rect x="20" y="540" width="350" height="240" rx="12" fill="white" opacity="0.9"/>
  <rect x="20" y="540" width="350" height="130" rx="12" fill="#b67272" opacity="0.4"/>
  <text x="40" y="700" font-family="sans-serif" font-size="16" font-weight="bold" fill="#4a3b3b">Kawalerka w centrum</text>
  <text x="40" y="726" font-family="sans-serif" font-size="13" fill="#7a5c5c">Kraków · 30 m²</text>
  <text x="40" y="754" font-family="sans-serif" font-size="18" font-weight="bold" fill="#d4a0a0">380 000 zł</text>
</svg>`

async function generate() {
  await sharp(Buffer.from(desktopSvg))
    .resize(1280, 720)
    .png()
    .toFile('./public/screenshots/desktop.png')
  console.log('Generated desktop screenshot')

  await sharp(Buffer.from(mobileSvg))
    .resize(390, 844)
    .png()
    .toFile('./public/screenshots/mobile.png')
  console.log('Generated mobile screenshot')
}

generate().catch(console.error)
