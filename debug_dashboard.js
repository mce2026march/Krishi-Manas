const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Listen to console logs
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`PAGE LOG ERROR: ${msg.text()}`);
    } else {
      console.log(`PAGE LOG: ${msg.text()}`);
    }
  });

  page.on('pageerror', error => {
    console.log(`PAGE ERROR: ${error.message}`);
  });

  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    
    // Simulate navigation to Farmer Onboarding
    await page.click('button:has-text("Farmer Access")');
    await page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {});
    
    console.log('Current URL: ' + page.url());

    // If on onboarding, simulate a basic form submission or demo mode
    try {
      await page.click('button:has-text("Simulation Mode")');
      console.log('Clicked Simulation Mode');
      await page.waitForTimeout(2000);
    } catch(e) {
      console.log('Could not find Simulation Mode button');
    }
    
    console.log('Final URL after timeout: ' + page.url());

  } catch (error) {
    console.error(`Script error: ${error}`);
  } finally {
    await browser.close();
  }
})();
