const { test } = require('@playwright/test');

test('Test Sources sub-tab', async ({ page }) => {
  await page.goto('file:///Users/davehillis/Documents/Cursor%20Folders/DCX%20Demo%20Templates/admin/content-hub.html');
  await page.waitForTimeout(1000);
  
  // Click Sources sub-tab
  await page.click('[data-subtab="manage-sources"]');
  await page.waitForTimeout(500);
  
  // Take screenshot
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/manage-sources.png', 
    fullPage: false 
  });
  
  console.log('Sources sub-tab screenshot saved!');
});

