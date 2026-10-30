const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, '..', 'presentation-assets');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

async function capture() {
  console.log('Launching browser to capture product screenshots...');
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: {
      width: 412,
      height: 915,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    },
  });

  const page = await browser.newPage();
  const baseUrl = 'https://garbage-rosy-six.vercel.app';

  console.log('Navigating to', baseUrl);
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });
  await page.waitForSelector('header');
  await new Promise(r => setTimeout(r, 1200));

  // 1. Dashboard
  console.log('Capturing 1: Dashboard...');
  await page.screenshot({ path: path.join(outputDir, '1-dashboard.png') });

  // 2. Open Mission Step 1 by clicking Start A Mission
  console.log('Navigating to Mission Wizard...');
  const clickedStart = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const startBtn = btns.find(b => b.textContent && b.textContent.includes('Start A Mission'));
    if (startBtn) {
      startBtn.click();
      return true;
    }
    return false;
  });

  if (!clickedStart) {
    // fallback to bottom nav
    await page.evaluate(() => {
      const navBtns = Array.from(document.querySelectorAll('nav button'));
      if (navBtns.length >= 3) navBtns[2].click();
    });
  }

  await new Promise(r => setTimeout(r, 1200));

  console.log('Capturing 2: Step 1 Setup & Before Photo...');
  await page.screenshot({ path: path.join(outputDir, '2-step1-setup.png') });

  // Click Pair 1 Fast-Fill
  console.log('Clicking Pair 1 fast fill...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const p1 = btns.find(b => b.textContent && b.textContent.includes('Pair 1: Real Street'));
    if (p1) p1.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Click Proceed to Step 2
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const proceed = btns.find(b => b.textContent && b.textContent.includes('Proceed'));
    if (proceed) proceed.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  console.log('Capturing 3: Step 2 After Photo & Proof...');
  await page.screenshot({ path: path.join(outputDir, '3-step2-after-proof.png') });

  // Click Pair 1 After
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const p1After = btns.find(b => b.textContent && b.textContent.includes('Pair 1: Real Swept Street'));
    if (p1After) p1After.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Click Submit for AI verification
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const submit = btns.find(b => b.textContent && b.textContent.includes('Submit for AI Verification'));
    if (submit) submit.click();
  });

  // Quickly capture loading screen during verification
  await new Promise(r => setTimeout(r, 500));
  console.log('Capturing 4: Step 3 Verification Loader...');
  await page.screenshot({ path: path.join(outputDir, '4-step3-verifying.png') });

  // Wait for result screen
  await new Promise(r => setTimeout(r, 3000));
  console.log('Capturing 5: Step 4 Mission Approved...');
  await page.screenshot({ path: path.join(outputDir, '5-step4-approved.png') });

  // Next: Test Rejection Screen
  console.log('Resetting and testing rejection scenario...');
  // Click Start Another Mission
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const another = btns.find(b => b.textContent && b.textContent.includes('Start Another Mission'));
    if (another) another.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Load Pair 2 Before
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const p2 = btns.find(b => b.textContent && b.textContent.includes('Pair 2: Test Fake'));
    if (p2) p2.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const proceed = btns.find(b => b.textContent && b.textContent.includes('Proceed'));
    if (proceed) proceed.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Load Pair 2 After (Cat Meme)
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const p2After = btns.find(b => b.textContent && b.textContent.includes('Pair 2: Meme'));
    if (p2After) p2After.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Submit rejection
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const submit = btns.find(b => b.textContent && b.textContent.includes('Submit for AI Verification'));
    if (submit) submit.click();
  });
  await new Promise(r => setTimeout(r, 3200));
  console.log('Capturing 6: Step 4 Rejection Result...');
  await page.screenshot({ path: path.join(outputDir, '6-step4-rejected.png') });

  // Navigate to Ledger
  console.log('Capturing 7: History Ledger...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('nav button'));
    const ledger = btns.find(b => b.textContent && b.textContent.includes('Ledger'));
    if (ledger) ledger.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, '7-history-ledger.png') });

  // Navigate to Leaderboard
  console.log('Capturing 8: Leaderboard...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('nav button'));
    const rank = btns.find(b => b.textContent && b.textContent.includes('Rankings'));
    if (rank) rank.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outputDir, '8-leaderboard.png') });

  await browser.close();
  console.log('All 8 screenshots successfully captured into /presentation-assets!');
}

capture().catch(err => {
  console.error('Screenshot error:', err);
  process.exit(1);
});
