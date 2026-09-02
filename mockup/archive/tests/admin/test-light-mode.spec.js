const { test, expect } = require('@playwright/test');

test('Test Light Mode UI', async ({ page }) => {
  await page.goto('file:///Users/davehillis/Documents/Cursor%20Folders/DCX%20Demo%20Templates/admin/content-hub.html');
  await page.waitForTimeout(1000);
  
  console.log('\n=== TESTING LIGHT MODE ===\n');
  
  // Switch to light mode
  await page.click('#theme-toggle');
  await page.waitForTimeout(500);
  
  // Verify theme is set to light
  const theme = await page.evaluate(() => document.body.getAttribute('data-theme'));
  console.log(`✓ Current theme: ${theme}`);
  expect(theme).toBe('light');
  
  // Test 1: Light mode - Manage > Library
  console.log('\n1. Testing Manage > Library...');
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/light-01-library.png', 
    fullPage: true 
  });
  console.log('   ✓ Screenshot saved');
  
  // Test 2: Light mode - Manage > Files
  console.log('\n2. Testing Manage > Files...');
  await page.click('[data-subtab="manage-files"]');
  await page.waitForTimeout(500);
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/light-02-files.png', 
    fullPage: false 
  });
  console.log('   ✓ Screenshot saved');
  
  // Test 3: Light mode - Manage > Sources
  console.log('\n3. Testing Manage > Sources...');
  await page.click('[data-subtab="manage-sources"]');
  await page.waitForTimeout(500);
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/light-03-sources.png', 
    fullPage: false 
  });
  console.log('   ✓ Screenshot saved');
  
  // Test 4: Light mode - Manage > Imports
  console.log('\n4. Testing Manage > Imports...');
  await page.click('[data-subtab="manage-jobs"]');
  await page.waitForTimeout(500);
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/light-04-imports.png', 
    fullPage: false 
  });
  console.log('   ✓ Screenshot saved');
  
  // Test 5: Light mode - Target > Collections
  console.log('\n5. Testing Target > Collections...');
  await page.click('[data-tab="target"]');
  await page.waitForTimeout(500);
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/light-05-collections.png', 
    fullPage: false 
  });
  console.log('   ✓ Screenshot saved');
  
  // Test 6: Light mode - Deliver > Releases
  console.log('\n6. Testing Deliver > Releases...');
  await page.click('[data-tab="deliver"]');
  await page.waitForTimeout(500);
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/light-06-releases.png', 
    fullPage: false 
  });
  console.log('   ✓ Screenshot saved');
  
  // Test 7: Verify theme toggle icon
  console.log('\n7. Checking theme toggle icon...');
  const sunIconVisible = await page.isVisible('.light-icon');
  const moonIconVisible = await page.isVisible('.dark-icon');
  console.log(`   Sun icon visible: ${sunIconVisible}`);
  console.log(`   Moon icon visible: ${moonIconVisible}`);
  expect(sunIconVisible).toBe(true);
  expect(moonIconVisible).toBe(false);
  
  // Test 8: Verify background colors
  console.log('\n8. Checking CSS variables...');
  const bgColor = await page.evaluate(() => {
    return getComputedStyle(document.body).getPropertyValue('background-color');
  });
  console.log(`   Body background: ${bgColor}`);
  
  const headerBg = await page.evaluate(() => {
    const header = document.querySelector('header');
    return getComputedStyle(header).backgroundColor;
  });
  console.log(`   Header background: ${headerBg}`);
  
  // Test 9: Test localStorage persistence
  console.log('\n9. Testing localStorage...');
  const savedTheme = await page.evaluate(() => localStorage.getItem('contentHubTheme'));
  console.log(`   Saved theme in localStorage: ${savedTheme}`);
  expect(savedTheme).toBe('light');
  
  // Test 10: Toggle back to dark and verify
  console.log('\n10. Testing toggle back to dark...');
  await page.click('#theme-toggle');
  await page.waitForTimeout(500);
  const newTheme = await page.evaluate(() => document.body.getAttribute('data-theme'));
  console.log(`   New theme: ${newTheme}`);
  expect(newTheme).toBe('dark');
  
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/light-10-back-to-dark.png', 
    fullPage: false 
  });
  console.log('   ✓ Screenshot saved');
  
  console.log('\n=== LIGHT MODE TESTS COMPLETE ===\n');
  console.log('All light mode screenshots saved to admin/screenshots/');
});

