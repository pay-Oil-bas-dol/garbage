const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

async function createPresentation() {
  console.log('Generating PowerPoint (.pptx) presentation...');
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'Clean & Earn (SafaiSaathi) Team';
  pres.company = 'Swachh Bharat Initiative';
  pres.title = 'Clean & Earn: Gamified Street Cleaning & Environmental AI Verification';

  const assetDir = path.join(__dirname, '..', 'presentation-assets');

  // Theme Colors
  const COLORS = {
    darkGreen: '064E3B',    // Dark Forest Emerald
    primaryGreen: '15803D', // Medium Green
    lightGreen: 'DCFCE7',   // Sage Tint
    mintGreen: '10B981',    // Vibrant Mint
    amber: 'D97706',        // Gold/Amber
    lightAmber: 'FEF3C7',   // Light Amber
    charcoal: '0F172A',     // Deep Slate
    slate: '334155',        // Body text
    lightSlate: '64748B',   // Subtitle text
    border: 'CBD5E1',       // Border line
    bgLight: 'F8FAF8',      // Background
    cardBg: 'FFFFFF',       // Card background
    red: 'DC2626',          // Red for rejection
    lightRed: 'FEE2E2',     // Light Red
  };

  const FONTS = {
    title: 'Arial',
    body: 'Arial',
  };

  // Helper: Header bar on content slides
  function addHeader(slide, category, title, subtitle) {
    // Top category badge
    slide.addText(category.toUpperCase(), {
      x: 0.8,
      y: 0.35,
      w: 8.5,
      h: 0.25,
      fontFace: FONTS.title,
      fontSize: 10,
      bold: true,
      color: COLORS.primaryGreen,
      letterSpacing: 2,
    });

    // Main title
    slide.addText(title, {
      x: 0.8,
      y: 0.55,
      w: 8.5,
      h: 0.45,
      fontFace: FONTS.title,
      fontSize: 20,
      bold: true,
      color: COLORS.charcoal,
    });

    // Optional subtitle
    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.8,
        y: 0.98,
        w: 8.5,
        h: 0.3,
        fontFace: FONTS.body,
        fontSize: 11,
        color: COLORS.lightSlate,
      });
    }

    // Top subtle divider line
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 1.3,
      w: 8.4,
      h: 0.02,
      fill: { color: 'E2E8F0' },
      line: { color: 'E2E8F0', width: 0 },
    });
  }

  // ==========================================
  // SLIDE 1: TITLE SLIDE (LIGHT GREEN CREAM THEME)
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: 'F8FAF6' };

    // Decorative shape
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 0.8,
      w: 2.8,
      h: 0.4,
      fill: { color: 'DCFCE7' },
      line: { color: '10B981', width: 1.5 },
      roundCorners: true,
    });
    slide.addText('🇮🇳 SWACHH BHARAT TECH INITIATIVE', {
      x: 0.8,
      y: 0.8,
      w: 2.8,
      h: 0.4,
      fontSize: 10,
      bold: true,
      color: '065F46',
      align: 'center',
    });

    slide.addText('Clean & Earn', {
      x: 0.8,
      y: 1.4,
      w: 8.4,
      h: 0.85,
      fontFace: FONTS.title,
      fontSize: 44,
      bold: true,
      color: '0F172A',
    });

    slide.addText('SafaiSaathi (सफ़ाई साथी) — Gamifying Civic Cleanliness in India', {
      x: 0.8,
      y: 2.25,
      w: 8.4,
      h: 0.45,
      fontFace: FONTS.title,
      fontSize: 18,
      bold: true,
      color: '047857',
    });

    slide.addText(
      'A full-stack mobile web platform connecting civic responsibility with multimodal AI verification, photographic proof, and verifiable reward points.',
      {
        x: 0.8,
        y: 2.75,
        w: 8.0,
        h: 0.65,
        fontFace: FONTS.body,
        fontSize: 13,
        color: '334155',
        lineSpacing: 19,
      }
    );

    // Live URL Badge Card
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 3.5,
      w: 6.2,
      h: 0.75,
      fill: { color: 'FFFFFF' },
      line: { color: '10B981', width: 1.5 },
      roundCorners: true,
    });
    slide.addText('🌐 Live Production Deployment on Vercel:\nhttps://garbage-rosy-six.vercel.app', {
      x: 0.9,
      y: 3.55,
      w: 6.0,
      h: 0.65,
      fontFace: FONTS.body,
      fontSize: 11,
      color: '065F46',
      bold: true,
    });

    // Tech Highlights Pills
    slide.addText('Next.js 16  •  Tailwind CSS  •  Supabase PostgreSQL  •  Google Gemini Vision AI', {
      x: 0.8,
      y: 4.45,
      w: 8.4,
      h: 0.4,
      fontFace: FONTS.body,
      fontSize: 12,
      bold: true,
      color: '047857',
    });

    slide.addNotes(
      'Good morning, sir. Welcome to my presentation on Clean & Earn (SafaiSaathi). The core idea is to motivate people to keep their surroundings clean by connecting technology, civic responsibility, and rewards with AI-assisted verification.'
    );
  }

  // ==========================================
  // SLIDE 2: MOTIVATION & ORIGIN OF THE IDEA
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: COLORS.bgLight };
    addHeader(slide, 'Slide 1 — Motivation & Origin', 'Why Clean & Earn?', 'Transforming shared responsibility into consistent community action');

    // Big central quote box
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 1.45,
      w: 8.4,
      h: 0.8,
      fill: { color: COLORS.lightGreen },
      line: { color: COLORS.mintGreen, width: 1 },
      roundCorners: true,
    });
    slide.addText('"How can we motivate people to take responsibility for cleanliness and make it a regular habit?"', {
      x: 1.0,
      y: 1.55,
      w: 8.0,
      h: 0.6,
      fontFace: FONTS.title,
      fontSize: 14,
      bold: true,
      color: COLORS.darkGreen,
      align: 'center',
    });

    // Three Pillars Cards
    const pillars = [
      {
        title: '1. Problem Observed',
        desc: 'Awareness exists, but consistent motivation is lacking. People often view cleanliness as someone else\'s job, resulting in recurring litter piles.',
        bg: 'FFFFFF',
        accent: COLORS.amber,
      },
      {
        title: '2. The Core Idea',
        desc: 'Gamify cleanup activities through missions. Provide instant positive feedback, transparent eco-points (20–50 pts), and civic recognition.',
        bg: 'FFFFFF',
        accent: COLORS.primaryGreen,
      },
      {
        title: '3. Long-Term Purpose',
        desc: 'Turn occasional volunteer efforts into permanent daily habits. Create a community culture where cleanliness is self-sustaining and celebrated.',
        bg: 'FFFFFF',
        accent: COLORS.darkGreen,
      },
    ];

    pillars.forEach((p, idx) => {
      const x = 0.8 + idx * 2.9;
      slide.addShape(pres.ShapeType.rect, {
        x: x,
        y: 2.45,
        w: 2.65,
        h: 2.0,
        fill: { color: p.bg },
        line: { color: 'E2E8F0', width: 1 },
        roundCorners: true,
      });

      slide.addShape(pres.ShapeType.rect, {
        x: x + 0.2,
        y: 2.65,
        w: 2.25,
        h: 0.05,
        fill: { color: p.accent },
        line: { color: p.accent, width: 0 },
      });

      slide.addText(p.title, {
        x: x + 0.2,
        y: 2.8,
        w: 2.25,
        h: 0.35,
        fontFace: FONTS.title,
        fontSize: 12,
        bold: true,
        color: COLORS.charcoal,
      });

      slide.addText(p.desc, {
        x: x + 0.2,
        y: 3.2,
        w: 2.25,
        h: 1.1,
        fontFace: FONTS.body,
        fontSize: 9.5,
        color: COLORS.slate,
        lineSpacing: 14,
      });
    });

    // Bottom Takeaway Bar
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 4.6,
      w: 8.4,
      h: 0.55,
      fill: { color: 'FEF3C7' },
      line: { color: 'F59E0B', width: 1 },
      roundCorners: true,
    });
    slide.addText('💡 Core Thought: What if doing something good for the environment also became rewarding and verifiable?', {
      x: 1.0,
      y: 4.65,
      w: 8.0,
      h: 0.45,
      fontFace: FONTS.body,
      fontSize: 11,
      bold: true,
      color: '92400E',
      align: 'center',
    });

    slide.addNotes(
      'Good morning, sir. The idea behind Clean & Earn came from a simple thought: how can we motivate people to keep their surroundings clean? I realised that awareness alone is not always enough to encourage regular participation. So, I thought of combining cleanliness activities with technology, recognition, and rewards to make participation more engaging.'
    );
  }

  // ==========================================
  // SLIDE 3: PROBLEM IDENTIFICATION & PROPOSED SOLUTION
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: COLORS.bgLight };
    addHeader(slide, 'Slide 2 — Problem & Solution', 'Problem Identification & Proposed Architecture', 'Connecting cleanliness activities with evidence, verification, and incentives');

    // Left Box: Problems Identified
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 1.45,
      w: 3.9,
      h: 3.6,
      fill: { color: 'FFFFFF' },
      line: { color: 'CBD5E1', width: 1 },
      roundCorners: true,
    });
    slide.addText('⚠️ Problems Identified', {
      x: 1.0,
      y: 1.6,
      w: 3.5,
      h: 0.35,
      fontFace: FONTS.title,
      fontSize: 13,
      bold: true,
      color: COLORS.charcoal,
    });

    const problems = [
      'Lack of Motivation: Civic awareness alone does not sustain regular volunteer participation.',
      'Unrecognised Efforts: Individuals who clean streets or public spaces rarely receive recognition.',
      'High Risk of Fraud: Self-reporting without proof leads to false claims and loss of trust.',
      'No Structured Channel: Lack of a simple, mobile-first platform to document and verify activities.',
    ];
    problems.forEach((prob, idx) => {
      slide.addText(`•  ${prob}`, {
        x: 1.0,
        y: 2.05 + idx * 0.7,
        w: 3.5,
        h: 0.65,
        fontFace: FONTS.body,
        fontSize: 10,
        color: COLORS.slate,
        lineSpacing: 14,
      });
    });

    // Right Box: Proposed Solution & Flow
    slide.addShape(pres.ShapeType.rect, {
      x: 4.9,
      y: 1.45,
      w: 4.3,
      h: 3.6,
      fill: { color: COLORS.lightGreen },
      line: { color: COLORS.mintGreen, width: 1 },
      roundCorners: true,
    });
    slide.addText('✅ My Proposed Solution: Clean & Earn', {
      x: 5.1,
      y: 1.6,
      w: 3.9,
      h: 0.35,
      fontFace: FONTS.title,
      fontSize: 13,
      bold: true,
      color: COLORS.darkGreen,
    });

    slide.addText('A 6-Stage Gamified Civic Cycle:', {
      x: 5.1,
      y: 1.95,
      w: 3.9,
      h: 0.25,
      fontFace: FONTS.body,
      fontSize: 10,
      bold: true,
      color: COLORS.primaryGreen,
    });

    const steps = [
      '1. Start a Mission: Select category (Plastic, Organic, Mixed, etc.)',
      '2. Document Before State: Capture photo & auto-record GPS location',
      '3. Clean the Area: Complete physical cleanup & segregate waste',
      '4. Upload After Proof: Capture cleaned site + optional video',
      '5. Multimodal AI Verification: Compares landmarks & checks fraud',
      '6. Earn Green Points (20–50): Update ledger & climb leaderboard',
    ];
    steps.forEach((step, idx) => {
      slide.addText(step, {
        x: 5.1,
        y: 2.25 + idx * 0.42,
        w: 3.9,
        h: 0.4,
        fontFace: FONTS.body,
        fontSize: 9.5,
        color: COLORS.charcoal,
      });
    });

    slide.addNotes(
      'Sir, the main problem I identified was the lack of consistent participation and recognition for individual cleanliness efforts. My solution is Clean & Earn, a web-based platform where users can start a mission, upload before-and-after photographs, and submit their work for verification. After approval, they can earn Green Points and redeem available rewards.'
    );
  }

  // ==========================================
  // SLIDE 4: PRODUCT SCREENSHOT 1 — DASHBOARD
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: COLORS.bgLight };
    addHeader(slide, 'Product Flow 1 — Dashboard', 'Gamified Volunteer Dashboard & Profile Hub', 'Prominent points showcase, live civic rank, and one-tap mission launcher');

    // Phone Frame / Screenshot
    const imgPath = path.join(assetDir, '1-dashboard.png');
    if (fs.existsSync(imgPath)) {
      slide.addImage({
        path: imgPath,
        x: 0.8,
        y: 1.45,
        w: 1.9,
        h: 3.65,
        roundCorners: true,
      });
    }

    // Right side: Feature Callouts
    slide.addShape(pres.ShapeType.rect, {
      x: 2.9,
      y: 1.45,
      w: 6.3,
      h: 3.65,
      fill: { color: 'FFFFFF' },
      line: { color: 'CBD5E1', width: 1 },
      roundCorners: true,
    });

    slide.addText('Core Dashboard Capabilities:', {
      x: 3.1,
      y: 1.6,
      w: 5.8,
      h: 0.35,
      fontFace: FONTS.title,
      fontSize: 13,
      bold: true,
      color: COLORS.charcoal,
    });

    const callouts = [
      {
        title: 'Prominent Total Earned Points Banner',
        desc: 'Displays the volunteer\'s accumulated Eco Points (e.g. 145 pts) with an animated tier badge (Level 1 Scout to Level 4 Swachh Guardian) and progress to next milestone.',
      },
      {
        title: 'Central "Start A Mission" Action CTA',
        desc: 'A large, glowing button immediately invites the volunteer to initiate a cleanup mission, capturing Before and After proof on the spot.',
      },
      {
        title: 'Real-World Environmental Metrics',
        desc: 'Automatically tallies waste cleared (~kg), missions verified, and community impact metrics for civic transparency.',
      },
      {
        title: 'Live Presentation Testing Toolbar',
        desc: 'Allows instant one-click testing between genuine street cleanup pairs (MG Road, New Delhi) and fake meme submissions during live evaluations.',
      },
    ];

    callouts.forEach((c, idx) => {
      const y = 2.05 + idx * 0.72;
      slide.addText(`✔  ${c.title}`, {
        x: 3.1,
        y: y,
        w: 5.8,
        h: 0.25,
        fontFace: FONTS.title,
        fontSize: 10.5,
        bold: true,
        color: COLORS.primaryGreen,
      });
      slide.addText(c.desc, {
        x: 3.3,
        y: y + 0.23,
        w: 5.6,
        h: 0.45,
        fontFace: FONTS.body,
        fontSize: 9,
        color: COLORS.slate,
        lineSpacing: 13,
      });
    });

    slide.addNotes(
      'Here is the live dashboard of the application. The interface is optimized for mobile browsers. The volunteer sees their accumulated points, their Swachh rank tier, and estimated waste cleared. The prominent button lets them launch a cleanup mission in seconds.'
    );
  }

  // ==========================================
  // SLIDE 5: PRODUCT SCREENSHOT 2 — STEP 1 SETUP & GPS
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: COLORS.bgLight };
    addHeader(slide, 'Product Flow 2 — Step 1: Mission Setup', 'Step 1: Waste Classification & Auto-GPS Capture', 'Categorizing debris and automatically establishing location integrity');

    const imgPath = path.join(assetDir, '2-step1-setup.png');
    if (fs.existsSync(imgPath)) {
      slide.addImage({
        path: imgPath,
        x: 0.8,
        y: 1.45,
        w: 1.9,
        h: 3.65,
        roundCorners: true,
      });
    }

    slide.addShape(pres.ShapeType.rect, {
      x: 2.9,
      y: 1.45,
      w: 6.3,
      h: 3.65,
      fill: { color: 'FFFFFF' },
      line: { color: 'CBD5E1', width: 1 },
      roundCorners: true,
    });

    slide.addText('Step 1 Architecture & Technical Features:', {
      x: 3.1,
      y: 1.6,
      w: 5.8,
      h: 0.35,
      fontFace: FONTS.title,
      fontSize: 13,
      bold: true,
      color: COLORS.charcoal,
    });

    const callouts2 = [
      {
        title: 'Waste Segregation Dropdown',
        desc: 'Volunteers classify the litter type into Plastic, Organic/Food Waste, Mixed Street Litter, Construction Rubble, E-Waste, or Hazardous glass/chemicals.',
      },
      {
        title: 'Direct Camera & File Capture',
        desc: 'Native HTML5 file input with accept="image/*" capture="environment", enabling mobile devices to trigger the rear camera directly with one tap.',
      },
      {
        title: 'Automatic Geolocation (GPS Coordinates)',
        desc: 'When the Before photo is selected, the browser Geolocation API automatically captures the user\'s exact Latitude and Longitude (e.g. 28.6139° N, 77.2090° E).',
      },
      {
        title: 'Graceful Error Handling & Fallbacks',
        desc: 'If the volunteer denies location permission or GPS times out, a friendly fallback assigns municipal coordinates so the user is never blocked.',
      },
    ];

    callouts2.forEach((c, idx) => {
      const y = 2.05 + idx * 0.72;
      slide.addText(`✔  ${c.title}`, {
        x: 3.1,
        y: y,
        w: 5.8,
        h: 0.25,
        fontFace: FONTS.title,
        fontSize: 10.5,
        bold: true,
        color: COLORS.primaryGreen,
      });
      slide.addText(c.desc, {
        x: 3.3,
        y: y + 0.23,
        w: 5.6,
        h: 0.45,
        fontFace: FONTS.body,
        fontSize: 9,
        color: COLORS.slate,
        lineSpacing: 13,
      });
    });

    slide.addNotes(
      'In Step 1 of the mission, the user categorizes the waste and photographs the littered site. Notice that the application automatically calls the browser Geolocation API to lock in the latitude and longitude, preventing users from reusing arbitrary internet photos.'
    );
  }

  // ==========================================
  // SLIDE 6: PRODUCT SCREENSHOT 3 — STEP 2 AFTER PROOF
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: COLORS.bgLight };
    addHeader(slide, 'Product Flow 3 — Step 2: Cleaning Proof', 'Step 2: Cleaned Site Proof & Video Evidence', 'Submitting the "After" state with reference comparison');

    const imgPath = path.join(assetDir, '3-step2-after-proof.png');
    if (fs.existsSync(imgPath)) {
      slide.addImage({
        path: imgPath,
        x: 0.8,
        y: 1.45,
        w: 1.9,
        h: 3.65,
        roundCorners: true,
      });
    }

    slide.addShape(pres.ShapeType.rect, {
      x: 2.9,
      y: 1.45,
      w: 6.3,
      h: 3.65,
      fill: { color: 'FFFFFF' },
      line: { color: 'CBD5E1', width: 1 },
      roundCorners: true,
    });

    slide.addText('Step 2 Technical Proof Mechanism:', {
      x: 3.1,
      y: 1.6,
      w: 5.8,
      h: 0.35,
      fontFace: FONTS.title,
      fontSize: 13,
      bold: true,
      color: COLORS.charcoal,
    });

    const callouts3 = [
      {
        title: 'Reference Thumbnail for Vantage Alignment',
        desc: 'Displays the "Before" photo as a live reference banner at the top, assisting the volunteer to capture the cleaned scene from the exact same camera angle.',
      },
      {
        title: 'Proof of Cleaning ("After" Photo)',
        desc: 'Captures the swept sidewalk or street section. The AI expects debris to be cleared and placed in segregation bags or municipal bins.',
      },
      {
        title: 'Optional Video Upload Proof',
        desc: 'Supports short 5–15 second walk-around video proof. Stored securely in Supabase Edge Storage for audit without consuming AI token quotas.',
      },
      {
        title: 'Anti-Tampering Checks',
        desc: 'Pre-validates that Before and After files are not identical copies or corrupted images before dispatching to the multimodal verification engine.',
      },
    ];

    callouts3.forEach((c, idx) => {
      const y = 2.05 + idx * 0.72;
      slide.addText(`✔  ${c.title}`, {
        x: 3.1,
        y: y,
        w: 5.8,
        h: 0.25,
        fontFace: FONTS.title,
        fontSize: 10.5,
        bold: true,
        color: COLORS.primaryGreen,
      });
      slide.addText(c.desc, {
        x: 3.3,
        y: y + 0.23,
        w: 5.6,
        h: 0.45,
        fontFace: FONTS.body,
        fontSize: 9,
        color: COLORS.slate,
        lineSpacing: 13,
      });
    });

    slide.addNotes(
      'In Step 2, the user submits the "After" photo. The app shows the before image thumbnail so the user can stand in the same position. Volunteers can also attach an optional short video clip for additional proof, which is archived in Supabase storage.'
    );
  }

  // ==========================================
  // SLIDE 7: PRODUCT SCREENSHOT 4 — STEP 3 VERIFYING
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: COLORS.bgLight };
    addHeader(slide, 'Product Flow 4 — Step 3: Verification', 'Step 3: Dedicated AI Verification Loading Screen', 'Visual engagement with animated radar scan and multimodal intelligence');

    const imgPath = path.join(assetDir, '4-step3-verifying.png');
    if (fs.existsSync(imgPath)) {
      slide.addImage({
        path: imgPath,
        x: 0.8,
        y: 1.45,
        w: 1.9,
        h: 3.65,
        roundCorners: true,
      });
    }

    slide.addShape(pres.ShapeType.rect, {
      x: 2.9,
      y: 1.45,
      w: 6.3,
      h: 3.65,
      fill: { color: 'FFFFFF' },
      line: { color: 'CBD5E1', width: 1 },
      roundCorners: true,
    });

    slide.addText('Dedicated Loading Screen & AI Pipeline:', {
      x: 3.1,
      y: 1.6,
      w: 5.8,
      h: 0.35,
      fontFace: FONTS.title,
      fontSize: 13,
      bold: true,
      color: COLORS.charcoal,
    });

    const callouts4 = [
      {
        title: 'Dedicated Text: "Verifying and allotting points..."',
        desc: 'Complies with project specifications. Keeps the user engaged with rotating radar sweeps, animated rings, and active state transitions.',
      },
      {
        title: 'Dynamic Multi-Phase Progression Tracker',
        desc: 'Cycles through transparent steps: "Analyzing landmarks...", "Authenticating anti-cheat...", "Measuring garbage volume...", "Calculating score (20-50 pts)".',
      },
      {
        title: 'Google Gemini 1.5 Flash Vision Multimodal Engine',
        desc: 'Dispatches both photos in a structured prompt: evaluates authenticity, checks for internet memes or mismatching scenes, estimates pile volume, and scores thoroughness.',
      },
      {
        title: 'Zero-Setup Fallback Neural Verifier',
        desc: 'If an API key is omitted or during offline grading, a custom built-in heuristic neural verifier ensures seamless grading with zero crashes.',
      },
    ];

    callouts4.forEach((c, idx) => {
      const y = 2.05 + idx * 0.72;
      slide.addText(`✔  ${c.title}`, {
        x: 3.1,
        y: y,
        w: 5.8,
        h: 0.25,
        fontFace: FONTS.title,
        fontSize: 10.5,
        bold: true,
        color: COLORS.primaryGreen,
      });
      slide.addText(c.desc, {
        x: 3.3,
        y: y + 0.23,
        w: 5.6,
        h: 0.45,
        fontFace: FONTS.body,
        fontSize: 9,
        color: COLORS.slate,
        lineSpacing: 13,
      });
    });

    slide.addNotes(
      'When submitted, the user sees our dedicated "Verifying and allotting points..." screen with an animated radar scanning graphic. Behind the scenes, the Gemini Vision API or our built-in neural verifier inspects background landmarks to ensure both images match the same location.'
    );
  }

  // ==========================================
  // SLIDE 8: PRODUCT SCREENSHOT 5 & 6 — RESULTS (PASS VS FAIL)
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: COLORS.bgLight };
    addHeader(slide, 'Product Flow 5 — Verification Results', 'Step 4: AI Evaluation (Approval vs. Polite Rejection)', 'Instant feedback, transparent scoring criteria (20–50 points), and anti-cheat enforcement');

    // Left Screenshot: Approved (+44 pts)
    const imgApp = path.join(assetDir, '5-step4-approved.png');
    if (fs.existsSync(imgApp)) {
      slide.addImage({
        path: imgApp,
        x: 0.8,
        y: 1.45,
        w: 1.8,
        h: 3.65,
        roundCorners: true,
      });
    }

    // Right Screenshot: Rejected (Meme detected)
    const imgRej = path.join(assetDir, '6-step4-rejected.png');
    if (fs.existsSync(imgRej)) {
      slide.addImage({
        path: imgRej,
        x: 2.75,
        y: 1.45,
        w: 1.8,
        h: 3.65,
        roundCorners: true,
      });
    }

    // Explanatory Card on Right
    slide.addShape(pres.ShapeType.rect, {
      x: 4.7,
      y: 1.45,
      w: 4.5,
      h: 3.65,
      fill: { color: 'FFFFFF' },
      line: { color: 'CBD5E1', width: 1 },
      roundCorners: true,
    });

    slide.addText('Verification Decision Engine:', {
      x: 4.9,
      y: 1.6,
      w: 4.1,
      h: 0.35,
      fontFace: FONTS.title,
      fontSize: 13,
      bold: true,
      color: COLORS.charcoal,
    });

    const comparePoints = [
      {
        title: 'Scenario A: Genuine Cleanup (Approved)',
        badge: 'PASS',
        color: COLORS.primaryGreen,
        desc: 'AI detects matching yellow curb markings and boundary wall. Pile thoroughly cleared into green eco-bag. Celebratory confetti triggers and +44 Eco Points are awarded.',
      },
      {
        title: 'Scenario B: Internet Meme / Mismatch (Rejected)',
        badge: 'REJECTED',
        color: COLORS.red,
        desc: 'Anti-cheat AI flags that the After photo is an unrelated cat meme or a different room. Submission rejected with polite reason: "After image appears to be an internet graphic."',
      },
      {
        title: 'Dynamic Point Allotment (20 to 50 pts)',
        badge: '20-50 PTS',
        color: COLORS.amber,
        desc: 'Small/easy cleanups receive ~20–30 pts; large, heavy debris cleanups earn ~40–50 pts. Automatically updates PostgreSQL database & user ledger.',
      },
    ];

    comparePoints.forEach((cp, idx) => {
      const y = 2.05 + idx * 0.95;
      slide.addText(`•  ${cp.title}`, {
        x: 4.9,
        y: y,
        w: 4.1,
        h: 0.25,
        fontFace: FONTS.title,
        fontSize: 10,
        bold: true,
        color: cp.color,
      });
      slide.addText(cp.desc, {
        x: 5.1,
        y: y + 0.23,
        w: 3.9,
        h: 0.65,
        fontFace: FONTS.body,
        fontSize: 9,
        color: COLORS.slate,
        lineSpacing: 13,
      });
    });

    slide.addNotes(
      'Here you can see both outcomes side by side. On the left, when real cleanup photos are provided, the AI verifies the identical curb landmarks, bursts celebratory confetti, and credits +44 points. On the right, when a meme or mismatched photo is submitted, the AI catches it and explains the rejection politely.'
    );
  }

  // ==========================================
  // SLIDE 9: PRODUCT SCREENSHOT 7 & 8 — LEDGER & LEADERBOARD
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: COLORS.bgLight };
    addHeader(slide, 'Product Flow 6 — Ledger & Community', 'Mission History Ledger & India Cleanliness League', 'Permanent audit trail of verified cleanups and competitive civic motivation');

    // Left Screenshot: History Ledger
    const imgLedger = path.join(assetDir, '7-history-ledger.png');
    if (fs.existsSync(imgLedger)) {
      slide.addImage({
        path: imgLedger,
        x: 0.8,
        y: 1.45,
        w: 1.8,
        h: 3.65,
        roundCorners: true,
      });
    }

    // Middle Screenshot: Leaderboard
    const imgRank = path.join(assetDir, '8-leaderboard.png');
    if (fs.existsSync(imgRank)) {
      slide.addImage({
        path: imgRank,
        x: 2.75,
        y: 1.45,
        w: 1.8,
        h: 3.65,
        roundCorners: true,
      });
    }

    // Right Side: Card breakdown
    slide.addShape(pres.ShapeType.rect, {
      x: 4.7,
      y: 1.45,
      w: 4.5,
      h: 3.65,
      fill: { color: 'FFFFFF' },
      line: { color: 'CBD5E1', width: 1 },
      roundCorners: true,
    });

    slide.addText('Transparency & Civic Competition:', {
      x: 4.9,
      y: 1.6,
      w: 4.1,
      h: 0.35,
      fontFace: FONTS.title,
      fontSize: 13,
      bold: true,
      color: COLORS.charcoal,
    });

    const ledgerPoints = [
      {
        title: 'Verifiable Mission Ledger',
        desc: 'Permanent record of every cleanup with timestamp, category tag, points awarded, and verbatim AI feedback quote.',
      },
      {
        title: 'GPS Coordinates & Google Maps Pin',
        desc: 'Every mission links to Google Maps coordinates so municipal auditors or community members can inspect the cleaned location.',
      },
      {
        title: 'City-Wide Cleanliness Rankings',
        desc: 'Ranks Indian cities (Indore, Surat, Navi Mumbai, New Delhi, Bengaluru) and top volunteers to foster healthy civic pride.',
      },
      {
        title: 'Before & After Inspection Drawer',
        desc: 'Tapping any mission opens a full-screen comparison modal with high-res photos and attached video proof.',
      },
    ];

    ledgerPoints.forEach((lp, idx) => {
      const y = 2.05 + idx * 0.72;
      slide.addText(`✔  ${lp.title}`, {
        x: 4.9,
        y: y,
        w: 4.1,
        h: 0.25,
        fontFace: FONTS.title,
        fontSize: 10,
        bold: true,
        color: COLORS.primaryGreen,
      });
      slide.addText(lp.desc, {
        x: 5.1,
        y: y + 0.23,
        w: 3.9,
        h: 0.45,
        fontFace: FONTS.body,
        fontSize: 9,
        color: COLORS.slate,
        lineSpacing: 13,
      });
    });

    slide.addNotes(
      'Finally, every verified mission is stored in the public ledger. Users can view past cleanups with Google Maps links and verbatim AI commentary. The leaderboard ranks both individual volunteers and top cities, encouraging long-term engagement.'
    );
  }

  // ==========================================
  // SLIDE 10: PRACTICAL FEASIBILITY
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: COLORS.bgLight };
    addHeader(slide, 'Slide 3 — Feasibility Analysis', 'Can Clean & Earn Work in Real Life?', 'Assessing technical, operational, financial, and social dimensions');

    const feasibilityItems = [
      {
        title: 'Technical Feasibility',
        icon: '💻',
        points: [
          'Web-based architecture runs on any mobile browser without app store friction.',
          'Next.js 16 + Vercel provides instant worldwide edge deployment.',
          'Automated AI vision eliminates manual human bottleneck in photo reviews.',
        ],
      },
      {
        title: 'Operational Feasibility',
        icon: '⚙️',
        points: [
          'Can be piloted immediately within a college campus or housing society.',
          'Authorised reviewers can spot-check high-point missions.',
          'Simple 3-step workflow requires zero prior training for volunteers.',
        ],
      },
      {
        title: 'Financial Feasibility',
        icon: '💰',
        points: [
          'Built on free-tier infrastructure (Vercel, Supabase PostgreSQL, Gemini API).',
          'Operating costs remain zero during initial pilot phase.',
          'Points can be redeemed for college credits or sponsored coupons.',
        ],
      },
      {
        title: 'Social Feasibility',
        icon: '🤝',
        points: [
          'Taps into the national Swachh Bharat civic consciousness.',
          'Gamification turns a solitary chore into an inspiring community achievement.',
          'Leaderboards foster peer participation and positive peer reinforcement.',
        ],
      },
    ];

    feasibilityItems.forEach((f, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.8 + col * 4.3;
      const y = 1.45 + row * 1.8;

      slide.addShape(pres.ShapeType.rect, {
        x: x,
        y: y,
        w: 4.1,
        h: 1.65,
        fill: { color: 'FFFFFF' },
        line: { color: 'CBD5E1', width: 1 },
        roundCorners: true,
      });

      slide.addText(`${f.icon}  ${f.title}`, {
        x: x + 0.2,
        y: y + 0.15,
        w: 3.7,
        h: 0.3,
        fontFace: FONTS.title,
        fontSize: 12,
        bold: true,
        color: COLORS.charcoal,
      });

      f.points.forEach((pt, pIdx) => {
        slide.addText(`• ${pt}`, {
          x: x + 0.2,
          y: y + 0.5 + pIdx * 0.35,
          w: 3.7,
          h: 0.32,
          fontFace: FONTS.body,
          fontSize: 8.5,
          color: COLORS.slate,
          lineSpacing: 12,
        });
      });
    });

    slide.addNotes(
      'Clean & Earn is practical because it can initially be implemented on a small scale, such as in a college or residential community. Users can access the platform through a web browser, while authorised reviewers verify submissions. We can start with limited rewards and expand gradually based on user participation, available resources, and actual results.'
    );
  }

  // ==========================================
  // SLIDE 11: VISION & LONG-TERM ROADMAP
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: COLORS.bgLight };
    addHeader(slide, 'Slide 4 — Vision & Roadmap', 'From a College Project to a National Civic Platform', 'A structured 5-phase growth strategy for sustainable expansion');

    // Vision Statement Banner
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 1.45,
      w: 8.4,
      h: 0.7,
      fill: { color: COLORS.lightGreen },
      line: { color: COLORS.mintGreen, width: 1 },
      roundCorners: true,
    });
    slide.addText('🎯 Vision: "To build a community where cleanliness becomes a shared habit and technology encourages people to create meaningful environmental impact."', {
      x: 1.0,
      y: 1.55,
      w: 8.0,
      h: 0.5,
      fontFace: FONTS.title,
      fontSize: 11,
      bold: true,
      color: COLORS.darkGreen,
      align: 'center',
    });

    // 5 Phases Timeline Cards
    const phases = [
      { num: 'Phase 1', title: 'Build & Test', desc: 'Validate core workflow with 50+ college students & local residential ward.' },
      { num: 'Phase 2', title: 'Engage Communities', desc: 'Expand to neighboring university campuses & resident welfare associations.' },
      { num: 'Phase 3', title: 'Partnerships', desc: 'Partner with local municipal corporations (MCD/BBMP) & eco sponsors.' },
      { num: 'Phase 4', title: 'AI & IoT Upgrade', desc: 'Deploy fine-tuned edge AI models & automated smart bin weight sensors.' },
      { num: 'Phase 5', title: 'Scaled Expansion', desc: 'National rollout across tier-1 and tier-2 Indian smart cities.' },
    ];

    phases.forEach((ph, idx) => {
      const x = 0.8 + idx * 1.72;
      slide.addShape(pres.ShapeType.rect, {
        x: x,
        y: 2.35,
        w: 1.55,
        h: 2.7,
        fill: { color: 'FFFFFF' },
        line: { color: idx === 0 ? COLORS.primaryGreen : 'CBD5E1', width: idx === 0 ? 2 : 1 },
        roundCorners: true,
      });

      slide.addShape(pres.ShapeType.rect, {
        x: x + 0.15,
        y: 2.5,
        w: 1.25,
        h: 0.3,
        fill: { color: idx === 0 ? COLORS.primaryGreen : 'E2E8F0' },
        roundCorners: true,
      });
      slide.addText(ph.num, {
        x: x + 0.15,
        y: 2.5,
        w: 1.25,
        h: 0.3,
        fontSize: 9,
        bold: true,
        color: idx === 0 ? 'FFFFFF' : COLORS.slate,
        align: 'center',
      });

      slide.addText(ph.title, {
        x: x + 0.1,
        y: 2.9,
        w: 1.35,
        h: 0.45,
        fontFace: FONTS.title,
        fontSize: 10.5,
        bold: true,
        color: COLORS.charcoal,
        align: 'center',
      });

      slide.addText(ph.desc, {
        x: x + 0.1,
        y: 3.4,
        w: 1.35,
        h: 1.5,
        fontFace: FONTS.body,
        fontSize: 8.5,
        color: COLORS.slate,
        align: 'center',
        lineSpacing: 12,
      });
    });

    slide.addNotes(
      'My vision is to make cleanliness a regular community habit rather than a one-time activity. Initially, I want to test the platform with a small group. In the future, it could expand through partnerships with colleges, NGOs, residential communities, and local organisations. AI-assisted image analysis could also help improve the verification process.'
    );
  }

  // ==========================================
  // SLIDE 12: FIVE-YEAR IMPACT REVIEW
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: COLORS.bgLight };
    addHeader(slide, 'Slide 5 — 5-Year Impact Review', 'Measuring Real-World Environmental Success', 'Evaluating outcomes based on community change rather than website vanity metrics');

    const metrics = [
      {
        title: '1. Participation & Retention',
        target: '10,000+ Active Volunteers',
        desc: 'Measuring weekly repeat cleanups rather than one-time signups. Assessing whether civic cleaning has truly become an ingrained personal habit.',
      },
      {
        title: '2. Verified Activities Volume',
        target: '50,000+ Verified Cleanups',
        desc: 'Audit rate of approved missions, precision of AI anti-fraud detection, and total metric tons of segregated waste diverted from landfills.',
      },
      {
        title: '3. Observable Environmental Impact',
        target: 'Visible Clean Street Index',
        desc: 'Photographic temporal tracking of repeat cleanup locations to measure whether streets stay clean longer as community norms shift.',
      },
      {
        title: '4. Financial & Operational Health',
        target: 'Self-Sustaining Sponsorships',
        desc: 'Maintaining sponsor rewards (bus passes, cafeteria discounts, retail vouchers) through corporate CSR and municipal green funds.',
      },
    ];

    metrics.forEach((m, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.8 + col * 4.3;
      const y = 1.45 + row * 1.8;

      slide.addShape(pres.ShapeType.rect, {
        x: x,
        y: y,
        w: 4.1,
        h: 1.65,
        fill: { color: 'FFFFFF' },
        line: { color: 'CBD5E1', width: 1 },
        roundCorners: true,
      });

      slide.addText(m.title, {
        x: x + 0.2,
        y: y + 0.15,
        w: 3.7,
        h: 0.3,
        fontFace: FONTS.title,
        fontSize: 12,
        bold: true,
        color: COLORS.charcoal,
      });

      slide.addShape(pres.ShapeType.rect, {
        x: x + 0.2,
        y: y + 0.5,
        w: 2.2,
        h: 0.25,
        fill: { color: COLORS.lightGreen },
        roundCorners: true,
      });
      slide.addText(m.target, {
        x: x + 0.2,
        y: y + 0.5,
        w: 2.2,
        h: 0.25,
        fontSize: 8.5,
        bold: true,
        color: COLORS.darkGreen,
        align: 'center',
      });

      slide.addText(m.desc, {
        x: x + 0.2,
        y: y + 0.82,
        w: 3.7,
        h: 0.75,
        fontFace: FONTS.body,
        fontSize: 8.5,
        color: COLORS.slate,
        lineSpacing: 12,
      });
    });

    slide.addNotes(
      'Sir, after five years, I would evaluate this project based on its actual impact, not just the number of users. I would measure active participation, verified cleanliness activities, improvements in the communities served, and financial sustainability. These results would help us understand whether the platform is genuinely useful and ready to expand.'
    );
  }

  // ==========================================
  // ==========================================
  // SLIDE 18: CONCLUSION (LIGHT GREEN CREAM THEME)
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: 'F8FAF6' };

    slide.addText('CONCLUSION', {
      x: 0.8,
      y: 0.6,
      w: 8.4,
      h: 0.3,
      fontFace: FONTS.title,
      fontSize: 12,
      bold: true,
      color: '065F46',
      letterSpacing: 2,
    });

    slide.addText('Small Actions. Collective Impact.', {
      x: 0.8,
      y: 0.95,
      w: 8.4,
      h: 0.6,
      fontFace: FONTS.title,
      fontSize: 34,
      bold: true,
      color: '0F172A',
    });

    // Summary Card
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 1.65,
      w: 8.4,
      h: 1.85,
      fill: { color: 'FFFFFF' },
      line: { color: '10B981', width: 2 },
      roundCorners: true,
    });

    const conclusions = [
      'Clean & Earn bridges technology, civic responsibility, and transparent rewards to solve real-world environmental apathy.',
      'AI verification via Google Gemini 1.5 Flash establishes credibility, preventing false claims and building trust.',
      'Lasting change depends on community involvement, responsible waste disposal, and continuous user-driven improvement.',
      'Next Immediate Step: Conduct an on-ground pilot with 50+ students to gather empirical feedback and refine verification.',
    ];

    conclusions.forEach((c, idx) => {
      slide.addText(`✔  ${c}`, {
        x: 1.0,
        y: 1.8 + idx * 0.4,
        w: 8.0,
        h: 0.35,
        fontFace: FONTS.body,
        fontSize: 12,
        color: '1E293B',
      });
    });

    // Final Message Quote Box
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 3.7,
      w: 8.4,
      h: 1.0,
      fill: { color: 'FEF3C7' },
      line: { color: 'F59E0B', width: 1.5 },
      roundCorners: true,
    });

    slide.addText('"A cleaner environment begins when small individual actions become a shared community habit."', {
      x: 1.0,
      y: 3.8,
      w: 8.0,
      h: 0.45,
      fontFace: FONTS.title,
      fontSize: 14,
      bold: true,
      color: '92400E',
      align: 'center',
    });

    slide.addText('Clean & Earn — Encouraging Action, Rewarding Responsibility.', {
      x: 1.0,
      y: 4.3,
      w: 8.0,
      h: 0.3,
      fontFace: FONTS.body,
      fontSize: 11.5,
      bold: true,
      color: 'B45309',
      align: 'center',
    });

    slide.addText('Thank You, Sir! Any Questions?  |  Live at https://garbage-rosy-six.vercel.app', {
      x: 0.8,
      y: 4.95,
      w: 8.4,
      h: 0.35,
      fontFace: FONTS.body,
      fontSize: 12,
      bold: true,
      color: '065F46',
      align: 'center',
    });

    slide.addNotes(
      'To conclude, Clean & Earn aims to connect technology with environmental responsibility by encouraging people to take action and rewarding verified efforts. However, lasting change requires community participation, responsible waste disposal, and continuous improvement. My ultimate goal is to turn small individual efforts into a lasting community habit. Thank you, sir.'
    );
  }

  // Save PPTX
  const outputPath = path.join(__dirname, '..', 'Clean_and_Earn_Presentation.pptx');
  await pres.writeFile({ fileName: outputPath });
  console.log(`Presentation generated successfully at: ${outputPath}`);
}

createPresentation().catch(err => {
  console.error('Error generating presentation:', err);
  process.exit(1);
});
