import { SampleSkill } from '../types';

// Crisp SVG data URLs that depict real rural skill items so users can test immediately
const kachiRotiSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="tawaGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2d2d2d" />
      <stop offset="85%" stop-color="#1a1a1a" />
      <stop offset="100%" stop-color="#0a0a0a" />
    </radialGradient>
    <radialGradient id="rotiGrad" cx="45%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#fdfbf7" />
      <stop offset="60%" stop-color="#f5ede0" />
      <stop offset="100%" stop-color="#eedfc9" />
    </radialGradient>
  </defs>
  <!-- Kitchen Tawa Background -->
  <rect width="400" height="400" fill="#f8fafc" />
  <circle cx="200" cy="200" r="185" fill="url(#tawaGrad)" stroke="#444" stroke-width="6"/>
  <!-- Tawa Handle reflection -->
  <path d="M 380 190 L 400 190 L 400 210 L 380 210 Z" fill="#222" />
  <!-- Slightly irregular Kachi Roti dough -->
  <path d="M 120 180 C 110 120, 190 100, 260 110 C 310 130, 310 230, 270 280 C 220 310, 130 300, 110 230 C 105 200, 115 190, 120 180 Z" fill="url(#rotiGrad)" stroke="#dec8aa" stroke-width="4"/>
  <!-- Light uncooked patches and very few faint pale brown spots -->
  <circle cx="170" cy="160" r="14" fill="#eed9bd" opacity="0.8" />
  <circle cx="230" cy="180" r="10" fill="#e4caaa" opacity="0.7" />
  <circle cx="190" cy="240" r="18" fill="#fcf6ec" />
  <ellipse cx="250" cy="230" rx="16" ry="12" fill="#c99f6f" opacity="0.4" />
  <!-- Flour dust markings showing raw dough -->
  <circle cx="150" cy="210" r="6" fill="#ffffff" opacity="0.9" />
  <circle cx="210" cy="140" r="8" fill="#ffffff" opacity="0.9" />
  <circle cx="250" cy="150" r="5" fill="#ffffff" opacity="0.8" />
  <text x="200" y="370" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">Kachi Roti on Tawa</text>
</svg>
`)}`;

const phooliRotiSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="phooliGrad" cx="40%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#fff8ed" />
      <stop offset="50%" stop-color="#f5e1bf" />
      <stop offset="85%" stop-color="#dca972" />
      <stop offset="100%" stop-color="#9a5a2b" />
    </radialGradient>
    <radialGradient id="spotGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#5a2e12" />
      <stop offset="70%" stop-color="#8b4513" />
      <stop offset="100%" stop-color="#b86b2d" />
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="#fff1f2" />
  <!-- Floral Plate Rim -->
  <circle cx="200" cy="200" r="185" fill="#ffffff" stroke="#fbcfe8" stroke-width="12" />
  <!-- Perfectly Round Puffed Phooli Roti -->
  <circle cx="200" cy="200" r="145" fill="url(#phooliGrad)" stroke="#c27d38" stroke-width="3" filter="drop-shadow(0 15px 15px rgba(100,50,10,0.25))"/>
  <!-- Golden Brown Roasted Spots (Chittiyan) -->
  <circle cx="160" cy="150" r="12" fill="url(#spotGrad)" />
  <ellipse cx="230" cy="165" rx="15" ry="10" fill="url(#spotGrad)" />
  <ellipse cx="180" cy="235" rx="18" ry="14" fill="url(#spotGrad)" />
  <circle cx="250" cy="220" r="10" fill="url(#spotGrad)" />
  <circle cx="140" cy="210" r="8" fill="url(#spotGrad)" />
  <circle cx="215" cy="130" r="6" fill="url(#spotGrad)" />
  <!-- Steam highlight -->
  <path d="M 180 90 Q 190 70 180 50" stroke="#f472b6" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
  <path d="M 210 85 Q 225 65 215 45" stroke="#f472b6" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
  <text x="200" y="375" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ec4899" text-anchor="middle">Gol Phooli Hui Taza Roti</text>
</svg>
`)}`;

const phulkariKadhaiSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="#881337" />
  <!-- Red Khaddar Fabric Texture -->
  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#700f2e" stroke-width="0.8"/>
  </pattern>
  <rect width="400" height="400" fill="url(#grid)" />
  <!-- Phulkari Yellow Silk Thread Embroidery Motifs -->
  <g stroke="#facc15" stroke-width="3" fill="#eab308">
    <!-- Center Flower -->
    <circle cx="200" cy="200" r="28" fill="#ea580c" stroke="#fef08a" stroke-width="4"/>
    <!-- Petals with silk stitch lines -->
    <path d="M 200 170 L 190 120 L 210 120 Z" />
    <path d="M 200 230 L 190 280 L 210 280 Z" />
    <path d="M 170 200 L 120 190 L 120 210 Z" />
    <path d="M 230 200 L 280 190 L 280 210 Z" />
    <path d="M 180 180 L 135 135 L 150 125 Z" fill="#10b981" stroke="#34d399"/>
    <path d="M 220 180 L 265 135 L 250 125 Z" fill="#10b981" stroke="#34d399"/>
    <path d="M 180 220 L 135 265 L 150 275 Z" fill="#10b981" stroke="#34d399"/>
    <path d="M 220 220 L 265 265 L 250 275 Z" fill="#10b981" stroke="#34d399"/>
  </g>
  <!-- Embroidery Needle & Silk Thread (Pat ka dhaga) -->
  <line x1="280" y1="210" x2="350" y2="280" stroke="#e2e8f0" stroke-width="4" stroke-linecap="round"/>
  <circle cx="345" cy="275" r="2" fill="#000" />
  <path d="M 345 275 Q 360 310 320 330 Q 290 350 260 330" fill="none" stroke="#f43f5e" stroke-width="3" stroke-dasharray="4 2"/>
  <text x="200" y="380" font-family="sans-serif" font-size="16" font-weight="bold" fill="#fef08a" text-anchor="middle">Sharqpur Phulkari Kadhai Tanka</text>
</svg>
`)}`;

const salanSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="curryGrad" cx="45%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#dc2626" />
      <stop offset="50%" stop-color="#b91c1c" />
      <stop offset="85%" stop-color="#7f1d1d" />
      <stop offset="100%" stop-color="#450a0a" />
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="#fdf2f8" />
  <!-- Handi / Balti Plate -->
  <circle cx="200" cy="200" r="175" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="10"/>
  <!-- Rich Curry Broth with Red Oil Roghan / Taree -->
  <circle cx="200" cy="200" r="145" fill="url(#curryGrad)" stroke="#f97316" stroke-width="4"/>
  <!-- Golden Oil Gloss (Taree) -->
  <ellipse cx="170" cy="160" rx="35" ry="18" fill="#fb923c" opacity="0.6"/>
  <ellipse cx="235" cy="220" rx="40" ry="22" fill="#ea580c" opacity="0.7"/>
  <!-- Pieces of Tender Chicken / Aloo Bhunai -->
  <ellipse cx="190" cy="205" rx="38" ry="26" fill="#78350f" stroke="#92400e" stroke-width="3"/>
  <circle cx="230" cy="170" r="22" fill="#854d0e" stroke="#a16207" stroke-width="2"/>
  <circle cx="155" cy="225" r="20" fill="#854d0e" stroke="#a16207" stroke-width="2"/>
  <!-- Fresh Coriander (Dhaniya) garnish -->
  <g fill="#22c55e" stroke="#15803d" stroke-width="1.5">
    <circle cx="190" cy="180" r="5" />
    <circle cx="196" cy="176" r="4" />
    <circle cx="185" cy="175" r="4" />
    <circle cx="220" cy="210" r="6" />
    <circle cx="228" cy="206" r="5" />
    <!-- Ginger slice -->
    <line x1="170" y1="190" x2="185" y2="180" stroke="#fef08a" stroke-width="3" stroke-linecap="round"/>
  </g>
  <text x="200" y="375" font-family="sans-serif" font-size="16" font-weight="bold" fill="#991b1b" text-anchor="middle">Laziz Chicken Salan (Taree aur Bhunai)</text>
</svg>
`)}`;

export const SAMPLE_SKILLS: SampleSkill[] = [
  {
    id: 'kachi-roti',
    title: 'Kachi Roti (Test Example)',
    category: 'roti',
    label: 'Kachi Roti',
    description: 'Tawa pe thodi kachi reh gayi roti',
    expectedFeedback: 'Ye roti thodi kachi hai, isay thoda aur sekain taakay narm aur phooli hui banay.',
    imageData: kachiRotiSvg,
  },
  {
    id: 'phooli-roti',
    title: 'Gol Phooli Hui Roti',
    category: 'roti',
    label: 'Phooli Roti',
    description: 'Poori tarah se paki hui gol narm roti',
    expectedFeedback: 'Mashallah! Bohot zabardast roti paki hai, bilkul gol aur narm!',
    imageData: phooliRotiSvg,
  },
  {
    id: 'phulkari-kadhai',
    title: 'Kadhai / Phulkari Tanka',
    category: 'kadhai',
    label: 'Phulkari Kadhai',
    description: 'Sharqpur ki phulkari soozankari',
    expectedFeedback: 'Kadhai ka tanka bohot safaai se laga hai, rangon ka mel lajawab hai.',
    imageData: phulkariKadhaiSvg,
  },
  {
    id: 'chicken-salan',
    title: 'Salan Ki Bhunai & Taree',
    category: 'salan',
    label: 'Mazedaar Salan',
    description: 'Salan ki taree aur bhunai ka tajziya',
    expectedFeedback: 'Salan ki taree bohot khush-numa aayi hai, bhunai theek hui hai.',
    imageData: salanSvg,
  },
];
