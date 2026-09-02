const { test } = require('@playwright/test');

test('Page builder UX snapshot', async ({ page }) => {
  await page.goto('file:///Users/davehillis/Documents/Cursor%20Folders/DCX%20Demo%20Templates/admin/page-builder.html');
  await page.setViewportSize({ width: 1440, height: 900 });
  // wait for lucide icons to hydrate and drag scripts to register
  await page.waitForTimeout(800);
  await page.screenshot({
    path: 'admin/screenshots/page-builder.png',
    fullPage: false
  });
});
