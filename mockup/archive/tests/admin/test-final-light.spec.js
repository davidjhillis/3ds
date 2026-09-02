const { test } = require('@playwright/test');

test('Final light mode test with text readability check', async ({ page }) => {
  await page.goto('file:///Users/davehillis/Documents/Cursor%20Folders/DCX%20Demo%20Templates/admin/content-hub.html');
  await page.waitForTimeout(1000);
  
  console.log('\n=== FINAL LIGHT MODE TEST ===\n');
  
  // Switch to light mode
  await page.click('#theme-toggle');
  await page.waitForTimeout(500);
  
  // Check header text colors
  console.log('1. Checking header...');
  const headerTitle = await page.evaluate(() => {
    const h1 = document.querySelector('header h1');
    return {
      text: h1.textContent,
      color: getComputedStyle(h1).color
    };
  });
  console.log(`   Title: "${headerTitle.text}"`);
  console.log(`   Color: ${headerTitle.color}`);
  
  // Take full header screenshot
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/final-light-header.png', 
    clip: { x: 0, y: 0, width: 1200, height: 200 }
  });
  
  // Check main content
  console.log('\n2. Checking Manage > Library...');
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/final-light-library.png', 
    fullPage: true
  });
  
  // Check card text
  console.log('\n3. Checking Manage > Sources...');
  await page.click('[data-subtab="manage-sources"]');
  await page.waitForTimeout(300);
  
  const cardText = await page.evaluate(() => {
    const card = document.querySelector('.source-card h3');
    if (card) {
      return {
        text: card.textContent,
        color: getComputedStyle(card).color
      };
    }
    return null;
  });
  
  if (cardText) {
    console.log(`   Card title: "${cardText.text}"`);
    console.log(`   Color: ${cardText.color}`);
  }
  
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/final-light-sources.png', 
    fullPage: false
  });
  
  // Check all tabs
  console.log('\n4. Testing all main tabs...');
  
  await page.click('[data-tab="transform"]');
  await page.waitForTimeout(300);
  console.log('   ✓ Transform tab');
  
  await page.click('[data-tab="target"]');
  await page.waitForTimeout(300);
  console.log('   ✓ Target tab');
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/final-light-target.png', 
    fullPage: false
  });
  
  await page.click('[data-tab="deliver"]');
  await page.waitForTimeout(300);
  console.log('   ✓ Deliver tab');
  await page.screenshot({ 
    path: '/Users/davehillis/Documents/Cursor Folders/DCX Demo Templates/admin/screenshots/final-light-deliver.png', 
    fullPage: false
  });
  
  console.log('\n=== FINAL TEST COMPLETE ===\n');
});

