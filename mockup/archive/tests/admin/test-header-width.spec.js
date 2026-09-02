const { test, expect } = require('@playwright/test');
const path = require('path');

test('Header width matches main content on large screen', async ({ page }) => {
  const filePath = path.join(__dirname, 'content-hub.html');
  await page.goto(`file://${filePath}`);
  
  // Set large viewport
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Get header container bounds
  const headerContainer = await page.locator('header > div.max-w-screen-2xl').boundingBox();
  
  // Get main content container bounds
  const mainContainer = await page.locator('div.max-w-screen-2xl').nth(1).boundingBox();
  
  // Both should have the same width and left position
  expect(headerContainer.width).toBe(mainContainer.width);
  expect(headerContainer.x).toBe(mainContainer.x);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'admin/screenshots/header-width-large.png',
    fullPage: true 
  });
  
  console.log('Header width test passed!');
  console.log(`Header container: ${headerContainer.width}px wide at x=${headerContainer.x}`);
  console.log(`Main container: ${mainContainer.width}px wide at x=${mainContainer.x}`);
});

