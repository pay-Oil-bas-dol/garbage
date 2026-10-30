const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePdf() {
  console.log('Generating high-resolution 18-Slide 16:9 PDF Presentation in Light Green Cream theme...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const presentationPath = path.resolve(__dirname, '..', 'presentation.html');
  await page.goto('file://' + presentationPath, { waitUntil: 'networkidle0' });

  // Add print stylesheet matching 16:9 presentation dimensions
  await page.addStyleTag({
    content: `
      @page { size: 1920px 1080px; margin: 0; }
      body { background: #F8FAF6 !important; margin: 0 !important; padding: 0 !important; }
      header, footer, .diagram-controls { display: none !important; }
      .nature-bg-pattern { display: block !important; opacity: 0.10 !important; position: fixed !important; inset: 0 !important; }
      main { max-width: none !important; padding: 0 !important; width: 1920px !important; margin: 0 !important; display: block !important; }
      .slide {
        display: flex !important;
        width: 1920px !important;
        height: 1080px !important;
        page-break-after: always !important;
        page-break-inside: avoid !important;
        box-sizing: border-box !important;
        padding: 50px 90px !important;
        margin: 0 !important;
        max-width: none !important;
        justify-content: center !important;
        align-items: center !important;
      }
      .pan-zoom-container {
        height: 680px !important;
        max-height: 680px !important;
        width: 100% !important;
      }
    `
  });

  const pdfPath = path.join(__dirname, '..', 'Clean_and_Earn_Presentation.pdf');
  const publicPdfPath = path.join(__dirname, '..', 'public', 'Clean_and_Earn_Presentation.pdf');

  console.log('Rendering 18 pages to PDF...');
  await page.pdf({
    path: pdfPath,
    width: '1920px',
    height: '1080px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });

  fs.copyFileSync(pdfPath, publicPdfPath);
  await browser.close();

  console.log(`PDF successfully created at:\n1. ${pdfPath}\n2. ${publicPdfPath}`);
}

generatePdf().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
