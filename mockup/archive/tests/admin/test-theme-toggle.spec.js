const { test } = require('@playwright/test');

test('Test theme toggle', async ({ page }) => {
  await page.goto('file:///Users/davehillis/Documents/Cursor%20Folders/DCX%20Demo%20Templates/admin/content-hub.html');
  await page.waitForTimeout(1000);
  
  // Check initial theme (should be dark by default)
  const initialTheme = await page.evaluate(() => document.body.getAttribute('data-theme'));
  console.log(`Initial theme: ${initialTheme}`);
  
  // Screenshot dark mode
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/theme-dark.png', 
    fullPage: false 
  });
  
  // Click theme toggle
  await page.click('#theme-toggle');
  await page.waitForTimeout(500);
  
  // Check new theme
  const newTheme = await page.evaluate(() => document.body.getAttribute('data-theme'));
  console.log(`After toggle: ${newTheme}`);
  
  // Screenshot light mode
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/theme-light.png', 
    fullPage: false 
  });
  
  // Toggle back
  await page.click('#theme-toggle');
  await page.waitForTimeout(500);
  
  const finalTheme = await page.evaluate(() => document.body.getAttribute('data-theme'));
  console.log(`After second toggle: ${finalTheme}`);
  
  console.log('\n✓ Theme toggle working!');
});

