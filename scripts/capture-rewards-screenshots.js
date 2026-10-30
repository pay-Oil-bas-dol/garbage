const puppeteer = require('puppeteer');

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle0' });

  // 1. Dashboard screenshot
  await page.screenshot({ path: 'test-dashboard-rewards.png' });
  console.log('Dashboard screenshot captured');

  // 2. Click Rewards Tab (4th button in bottom nav)
  const buttons = await page.$$('nav button');
  if (buttons.length >= 4) {
    await buttons[3].click();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: 'test-rewards-catalog.png' });
    console.log('Rewards catalog screenshot captured');

    // 3. Click 'My Coupons Vault' button
    const clickedVault = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const vaultBtn = btns.find((b) => b.textContent && b.textContent.includes('My Coupons Vault'));
      if (vaultBtn) {
        vaultBtn.click();
        return true;
      }
      return false;
    });

    if (clickedVault) {
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: 'test-rewards-vault.png' });
      console.log('Rewards vault screenshot captured');
    }
  }

  await browser.close();
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
