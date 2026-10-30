const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const demoDir = path.join(__dirname, '..', 'demo-assets');
const publicDemoDir = path.join(__dirname, '..', 'public', 'demo-assets');

if (!fs.existsSync(demoDir)) fs.mkdirSync(demoDir, { recursive: true });
if (!fs.existsSync(publicDemoDir)) fs.mkdirSync(publicDemoDir, { recursive: true });

// SVG for Pair 1 Before: Street corner with brick wall, curb, pavement, and substantial trash pile
const pair1BeforeSvg = `
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background sky & sunlight -->
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>
    <!-- Brick wall pattern -->
    <pattern id="brickPattern" width="40" height="20" patternUnits="userSpaceOnUse">
      <rect width="40" height="20" fill="#B45309" stroke="#78350F" stroke-width="1.5"/>
      <line x1="0" y1="10" x2="40" y2="10" stroke="#78350F" stroke-width="1.5"/>
      <line x1="20" y1="0" x2="20" y2="10" stroke="#78350F" stroke-width="1.5"/>
      <line x1="0" y1="10" x2="0" y2="20" stroke="#78350F" stroke-width="1.5"/>
      <line x1="40" y1="10" x2="40" y2="20" stroke="#78350F" stroke-width="1.5"/>
    </pattern>
    <!-- Concrete pavement gradient -->
    <linearGradient id="pavementGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#64748B"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="3" dy="4" stdDeviation="3" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Sky -->
  <rect width="800" height="200" fill="url(#skyGrad)"/>

  <!-- Brick boundary wall -->
  <rect x="0" y="120" width="800" height="200" fill="url(#brickPattern)"/>
  <!-- Street name plate / Landmark on wall -->
  <rect x="50" y="150" width="180" height="50" rx="6" fill="#1E3A8A" stroke="#FFFFFF" stroke-width="2"/>
  <text x="140" y="180" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="14" text-anchor="middle">MG ROAD - SEC 4</text>
  <text x="140" y="193" fill="#93C5FD" font-family="sans-serif" font-size="9" text-anchor="middle">NEW DELHI - 110001</text>

  <!-- Concrete Curbstone -->
  <rect x="0" y="315" width="800" height="25" fill="#CBD5E1" stroke="#475569" stroke-width="2"/>
  <!-- Yellow curb stripes (Indian municipal standard) -->
  <rect x="40" y="317" width="50" height="21" fill="#FACC15"/>
  <rect x="150" y="317" width="50" height="21" fill="#FACC15"/>
  <rect x="260" y="317" width="50" height="21" fill="#FACC15"/>
  <rect x="370" y="317" width="50" height="21" fill="#FACC15"/>
  <rect x="480" y="317" width="50" height="21" fill="#FACC15"/>
  <rect x="590" y="317" width="50" height="21" fill="#FACC15"/>
  <rect x="700" y="317" width="50" height="21" fill="#FACC15"/>

  <!-- Asphalt Road & Sidewalk Pavement -->
  <rect x="0" y="340" width="800" height="260" fill="url(#pavementGrad)"/>

  <!-- Sidewalk crack for unique geographic matching -->
  <path d="M 120 340 L 140 420 L 125 500 L 160 600" stroke="#334155" stroke-width="2.5" fill="none"/>
  <path d="M 680 340 L 660 410 L 690 530" stroke="#334155" stroke-width="2" fill="none"/>

  <!-- HEAVY GARBAGE PILE (BEFORE STATE) -->
  <!-- Dark debris shadow -->
  <ellipse cx="400" cy="460" rx="280" ry="80" fill="#1E293B" opacity="0.45"/>

  <!-- Mixed plastic bags, bottles, cartons, wrappers -->
  <!-- Black garbage bag split open -->
  <path d="M 280 430 Q 310 370 380 390 Q 420 400 410 460 Q 360 480 300 470 Z" fill="#0F172A" filter="url(#shadow)"/>
  <circle cx="340" cy="430" r="22" fill="#1E293B"/>

  <!-- Crushed blue plastic bottles -->
  <rect x="230" y="460" width="60" height="25" rx="5" transform="rotate(-20 230 460)" fill="#38BDF8" opacity="0.9" filter="url(#shadow)"/>
  <rect x="440" y="470" width="70" height="28" rx="6" transform="rotate(35 440 470)" fill="#0284C7" opacity="0.85" filter="url(#shadow)"/>
  <rect x="360" y="490" width="55" height="22" rx="4" transform="rotate(10 360 490)" fill="#60A5FA" opacity="0.8" filter="url(#shadow)"/>

  <!-- Crushed snack food wrappers (red, yellow, green) -->
  <polygon points="320,440 370,430 380,465 330,460" fill="#EF4444" filter="url(#shadow)"/>
  <text x="350" y="452" font-size="8" fill="#FFF" font-family="sans-serif">CHIPS</text>
  <polygon points="410,420 460,410 470,445 420,450" fill="#F59E0B" filter="url(#shadow)"/>
  <polygon points="260,490 310,480 300,515 250,510" fill="#10B981" filter="url(#shadow)"/>

  <!-- Plastic cups and food containers -->
  <polygon points="460,460 490,460 485,490 465,490" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1"/>
  <polygon points="210,430 240,425 235,455 210,450" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1"/>

  <!-- Discarded cardboard box crumpled -->
  <polygon points="470,410 550,390 560,440 480,455" fill="#D97706" stroke="#92400E" stroke-width="2" filter="url(#shadow)"/>
  <line x1="510" y1="400" x2="520" y2="450" stroke="#78350F" stroke-width="1.5"/>

  <!-- Organic waste & vegetable peel leftovers -->
  <ellipse cx="370" cy="460" rx="35" ry="15" fill="#65A30D" opacity="0.85"/>
  <ellipse cx="390" cy="475" rx="25" ry="12" fill="#78350F" opacity="0.75"/>

  <!-- Timestamp & GPS Stamp banner at bottom -->
  <rect x="0" y="560" width="800" height="40" fill="#000000" opacity="0.75"/>
  <text x="20" y="585" fill="#4ADE80" font-family="monospace" font-size="14" font-weight="bold">● BEFORE CLEANUP | MG Road, New Delhi | Lat: 28.6139° N, Long: 77.2090° E | Waste: Mixed Plastic &amp; Organic</text>
</svg>
`;

// SVG for Pair 1 After: The EXACT SAME street corner, perfectly swept, waste bag placed neatly on side
const pair1AfterSvg = `
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>
    <pattern id="brickPattern" width="40" height="20" patternUnits="userSpaceOnUse">
      <rect width="40" height="20" fill="#B45309" stroke="#78350F" stroke-width="1.5"/>
      <line x1="0" y1="10" x2="40" y2="10" stroke="#78350F" stroke-width="1.5"/>
      <line x1="20" y1="0" x2="20" y2="10" stroke="#78350F" stroke-width="1.5"/>
      <line x1="0" y1="10" x2="0" y2="20" stroke="#78350F" stroke-width="1.5"/>
      <line x1="40" y1="10" x2="40" y2="20" stroke="#78350F" stroke-width="1.5"/>
    </pattern>
    <linearGradient id="pavementGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#64748B"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="3" dy="4" stdDeviation="3" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Sky -->
  <rect width="800" height="200" fill="url(#skyGrad)"/>

  <!-- EXACT SAME brick boundary wall -->
  <rect x="0" y="120" width="800" height="200" fill="url(#brickPattern)"/>
  <!-- Street name plate / Landmark on wall (matching position) -->
  <rect x="50" y="150" width="180" height="50" rx="6" fill="#1E3A8A" stroke="#FFFFFF" stroke-width="2"/>
  <text x="140" y="180" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="14" text-anchor="middle">MG ROAD - SEC 4</text>
  <text x="140" y="193" fill="#93C5FD" font-family="sans-serif" font-size="9" text-anchor="middle">NEW DELHI - 110001</text>

  <!-- EXACT SAME Concrete Curbstone -->
  <rect x="0" y="315" width="800" height="25" fill="#CBD5E1" stroke="#475569" stroke-width="2"/>
  <!-- Matching Yellow curb stripes -->
  <rect x="40" y="317" width="50" height="21" fill="#FACC15"/>
  <rect x="150" y="317" width="50" height="21" fill="#FACC15"/>
  <rect x="260" y="317" width="50" height="21" fill="#FACC15"/>
  <rect x="370" y="317" width="50" height="21" fill="#FACC15"/>
  <rect x="480" y="317" width="50" height="21" fill="#FACC15"/>
  <rect x="590" y="317" width="50" height="21" fill="#FACC15"/>
  <rect x="700" y="317" width="50" height="21" fill="#FACC15"/>

  <!-- Clean Asphalt Road & Sidewalk Pavement -->
  <rect x="0" y="340" width="800" height="260" fill="url(#pavementGrad)"/>

  <!-- Matching sidewalk cracks to prove same location -->
  <path d="M 120 340 L 140 420 L 125 500 L 160 600" stroke="#334155" stroke-width="2.5" fill="none"/>
  <path d="M 680 340 L 660 410 L 690 530" stroke="#334155" stroke-width="2" fill="none"/>

  <!-- Swept clean floor with subtle sweep brush marks -->
  <path d="M 280 430 Q 380 440 480 420" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 6" fill="none"/>
  <path d="M 260 460 Q 390 470 510 450" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 6" fill="none"/>
  <path d="M 290 490 Q 400 500 520 480" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 6" fill="none"/>

  <!-- Cleaned Green Segregation Waste Bag neatly tied at the side -->
  <ellipse cx="640" cy="460" rx="35" ry="12" fill="#1E293B" opacity="0.3"/>
  <path d="M 610 450 C 600 400 620 360 645 355 C 670 360 690 400 680 450 Z" fill="#16A34A" filter="url(#shadow)"/>
  <!-- Bag tied neck -->
  <rect x="635" y="348" width="20" height="10" rx="3" fill="#15803D"/>
  <path d="M 632 348 Q 645 335 658 348" stroke="#FACC15" stroke-width="3" fill="none"/>
  <!-- Eco Swachh symbol on bag -->
  <circle cx="645" cy="410" r="14" fill="#FFFFFF"/>
  <path d="M 640 410 L 644 414 L 652 404" stroke="#16A34A" stroke-width="2.5" fill="none"/>

  <!-- Broom resting nearby against wall -->
  <line x1="720" y1="280" x2="710" y2="470" stroke="#78350F" stroke-width="6" stroke-linecap="round"/>
  <polygon points="700,470 720,470 730,500 690,500" fill="#D97706"/>

  <!-- Success checkmark icon in center of cleaned area -->
  <circle cx="390" cy="450" r="28" fill="#10B981" filter="url(#shadow)"/>
  <path d="M 378 450 L 386 458 L 402 442" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

  <!-- Timestamp & GPS Stamp banner at bottom -->
  <rect x="0" y="560" width="800" height="40" fill="#000000" opacity="0.75"/>
  <text x="20" y="585" fill="#4ADE80" font-family="monospace" font-size="14" font-weight="bold">✓ AFTER CLEANUP | MG Road, New Delhi | Lat: 28.6139° N, Long: 77.2090° E | 100% Cleared &amp; Swept</text>
</svg>
`;

// SVG for Pair 2 Before: An Indian market/alley with trash
const pair2BeforeSvg = `
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#E2E8F0"/>
  <rect x="0" y="0" width="800" height="320" fill="#FDE68A"/>
  <!-- Street shop shutters -->
  <rect x="50" y="80" width="300" height="240" fill="#3B82F6"/>
  <line x1="50" y1="120" x2="350" y2="120" stroke="#1D4ED8" stroke-width="2"/>
  <line x1="50" y1="160" x2="350" y2="160" stroke="#1D4ED8" stroke-width="2"/>
  <line x1="50" y1="200" x2="350" y2="200" stroke="#1D4ED8" stroke-width="2"/>
  <text x="200" y="60" font-family="sans-serif" font-weight="bold" font-size="18" fill="#1E293B" text-anchor="middle">SHARMA GENERAL STORE</text>
  
  <!-- Road -->
  <rect x="0" y="320" width="800" height="280" fill="#475569"/>
  <!-- Big pile of cardboard boxes and debris -->
  <ellipse cx="400" cy="460" rx="220" ry="60" fill="#1E293B" opacity="0.4"/>
  <rect x="300" y="400" width="90" height="60" fill="#B45309"/>
  <rect x="370" y="380" width="100" height="70" fill="#D97706"/>
  <circle cx="490" cy="440" r="25" fill="#EF4444"/>
  <circle cx="270" cy="450" r="30" fill="#0284C7"/>
  <text x="400" y="550" fill="#F8FAFC" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">STREET MARKET DUMP (BEFORE PHOTO)</text>
</svg>
`;

// SVG for Pair 2 After: A FUNNY MEME / TOTALLY UNRELATED CAT MEME / LIVING ROOM (Designed to be caught & rejected by AI)
const pair2AfterSvg = `
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <!-- Bright meme background -->
  <rect width="800" height="600" fill="#F43F5E"/>
  
  <!-- Funny internet cat graphic / meme placeholder -->
  <circle cx="400" cy="300" r="160" fill="#FDE047"/>
  <!-- Cat Ears -->
  <polygon points="270,220 320,120 370,200" fill="#FDE047" stroke="#CA8A04" stroke-width="4"/>
  <polygon points="430,200 480,120 530,220" fill="#FDE047" stroke="#CA8A04" stroke-width="4"/>
  <polygon points="290,200 320,150 350,195" fill="#F472B6"/>
  <polygon points="450,195 480,150 510,200" fill="#F472B6"/>

  <!-- Big Cat Meme Eyes -->
  <circle cx="340" cy="270" r="30" fill="#FFFFFF"/>
  <circle cx="460" cy="270" r="30" fill="#FFFFFF"/>
  <ellipse cx="340" cy="270" rx="14" ry="24" fill="#000000"/>
  <ellipse cx="460" cy="270" rx="14" ry="24" fill="#000000"/>

  <!-- Whiskers & Nose -->
  <polygon points="390,310 410,310 400,325" fill="#F43F5E"/>
  <path d="M 400 325 Q 385 345 370 335" stroke="#000000" stroke-width="3" fill="none"/>
  <path d="M 400 325 Q 415 345 430 335" stroke="#000000" stroke-width="3" fill="none"/>
  
  <line x1="280" y1="310" x2="350" y2="315" stroke="#000000" stroke-width="3"/>
  <line x1="280" y1="330" x2="350" y2="325" stroke="#000000" stroke-width="3"/>
  <line x1="450" y1="315" x2="520" y2="310" stroke="#000000" stroke-width="3"/>
  <line x1="450" y1="325" x2="520" y2="330" stroke="#000000" stroke-width="3"/>

  <!-- Classic Meme Impact Font Text -->
  <rect x="40" y="40" width="720" height="60" rx="8" fill="#000000" opacity="0.7"/>
  <text x="400" y="82" fill="#FFFFFF" font-family="Impact, sans-serif" font-size="34" font-weight="bold" text-anchor="middle" letter-spacing="2">TRYING TO TRICK THE AI LIKE...</text>

  <rect x="40" y="490" width="720" height="70" rx="8" fill="#000000" opacity="0.8"/>
  <text x="400" y="535" fill="#FACC15" font-family="Impact, sans-serif" font-size="28" font-weight="bold" text-anchor="middle" letter-spacing="1">[FAKE SUBMISSION / INTERNET MEME - REJECTION TEST]</text>
</svg>
`;

async function generateImages() {
  console.log('Generating demo asset images using sharp...');

  const files = [
    { name: 'pair1-before.jpg', svg: pair1BeforeSvg },
    { name: 'pair1-after.jpg', svg: pair1AfterSvg },
    { name: 'pair2-before.jpg', svg: pair2BeforeSvg },
    { name: 'pair2-after.jpg', svg: pair2AfterSvg },
  ];

  for (const f of files) {
    const destPath = path.join(demoDir, f.name);
    const pubDestPath = path.join(publicDemoDir, f.name);

    await sharp(Buffer.from(f.svg))
      .jpeg({ quality: 90 })
      .toFile(destPath);

    await sharp(Buffer.from(f.svg))
      .jpeg({ quality: 90 })
      .toFile(pubDestPath);

    console.log(`Created: ${destPath} & ${pubDestPath}`);
  }

  // Also create a sample video file placeholder or mp4/webm note
  const videoNote = `Sample video proof file placeholder for mission uploads. Video uploads are optional and preserved in Supabase Storage as proof without AI token consumption.`;
  fs.writeFileSync(path.join(demoDir, 'sample-cleanup-proof.txt'), videoNote);
  fs.writeFileSync(path.join(publicDemoDir, 'sample-cleanup-proof.txt'), videoNote);

  console.log('All demo assets successfully generated!');
}

generateImages().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
