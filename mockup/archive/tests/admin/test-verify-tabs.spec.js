const { test, expect } = require('@playwright/test');

test('Verify tab structure and navigation', async ({ page }) => {
  await page.goto('file:///Users/davehillis/Documents/Cursor%20Folders/DCX%20Demo%20Templates/admin/content-hub.html');
  
  // Wait for page to load
  await page.waitForTimeout(1000);
  
  // Screenshot initial state
  await page.screenshot({ path: 'DCX Demo Templates/admin/screenshots/01-initial-state.png', fullPage: true });
  
  // Check main tabs
  console.log('\n=== MAIN TABS ===');
  const mainTabs = await page.locator('.tab-btn').all();
  console.log(`Found ${mainTabs.length} main tabs`);
  
  for (let i = 0; i < mainTabs.length; i++) {
    const text = await mainTabs[i].textContent();
    const isActive = await mainTabs[i].evaluate(el => el.classList.contains('active'));
    console.log(`Tab ${i + 1}: "${text.trim()}" - Active: ${isActive}`);
  }
  
  // Check visible tab content
  console.log('\n=== VISIBLE TAB CONTENT ===');
  const tabContents = await page.locator('.tab-content').all();
  console.log(`Found ${tabContents.length} tab content sections`);
  
  for (let i = 0; i < tabContents.length; i++) {
    const id = await tabContents[i].getAttribute('id');
    const isVisible = await tabContents[i].isVisible();
    const hasActive = await tabContents[i].evaluate(el => el.classList.contains('active'));
    console.log(`Content ${i + 1}: ID="${id}" - Visible: ${isVisible}, Active class: ${hasActive}`);
  }
  
  // Check sub-tabs in Manage tab
  console.log('\n=== SUB-TABS IN MANAGE ===');
  const subTabs = await page.locator('.sub-tab-btn').all();
  console.log(`Found ${subTabs.length} sub-tabs`);
  
  for (let i = 0; i < subTabs.length; i++) {
    const text = await subTabs[i].textContent();
    const isActive = await subTabs[i].evaluate(el => el.classList.contains('active'));
    console.log(`Sub-tab ${i + 1}: "${text.trim()}" - Active: ${isActive}`);
  }
  
  // Check sub-tab content visibility
  console.log('\n=== SUB-TAB CONTENT VISIBILITY ===');
  const subTabContents = await page.locator('.sub-tab-content').all();
  console.log(`Found ${subTabContents.length} sub-tab content sections`);
  
  for (let i = 0; i < subTabContents.length; i++) {
    const id = await subTabContents[i].getAttribute('id');
    const isVisible = await subTabContents[i].isVisible();
    const hasActive = await subTabContents[i].evaluate(el => el.classList.contains('active'));
    console.log(`Sub-content ${i + 1}: ID="${id}" - Visible: ${isVisible}, Active class: ${hasActive}`);
  }
  
  // Test clicking Transform tab
  console.log('\n=== CLICKING TRANSFORM TAB ===');
  const transformTab = page.locator('.tab-btn[data-tab="transform"]');
  if (await transformTab.count() > 0) {
    await transformTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'DCX Demo Templates/admin/screenshots/02-transform-tab.png', fullPage: true });
    
    const transformContent = page.locator('#transform-content');
    const isVisible = await transformContent.isVisible();
    console.log(`Transform content visible: ${isVisible}`);
  } else {
    console.log('Transform tab not found!');
  }
  
  // Test clicking Target tab
  console.log('\n=== CLICKING TARGET TAB ===');
  const targetTab = page.locator('.tab-btn[data-tab="target"]');
  if (await targetTab.count() > 0) {
    await targetTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'DCX Demo Templates/admin/screenshots/03-target-tab.png', fullPage: true });
    
    const targetContent = page.locator('#target-content');
    const isVisible = await targetContent.isVisible();
    console.log(`Target content visible: ${isVisible}`);
  } else {
    console.log('Target tab not found!');
  }
  
  // Test clicking Deliver tab
  console.log('\n=== CLICKING DELIVER TAB ===');
  const deliverTab = page.locator('.tab-btn[data-tab="deliver"]');
  if (await deliverTab.count() > 0) {
    await deliverTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'DCX Demo Templates/admin/screenshots/04-deliver-tab.png', fullPage: true });
    
    const deliverContent = page.locator('#deliver-content');
    const isVisible = await deliverContent.isVisible();
    console.log(`Deliver content visible: ${isVisible}`);
  } else {
    console.log('Deliver tab not found!');
  }
  
  // Go back to Manage and test sub-tabs
  console.log('\n=== TESTING SUB-TAB NAVIGATION ===');
  await page.locator('.tab-btn[data-tab="manage"]').click();
  await page.waitForTimeout(500);
  
  // Click Library sub-tab
  const librarySubTab = page.locator('.sub-tab-btn[data-subtab="manage-library"]');
  if (await librarySubTab.count() > 0) {
    await librarySubTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'DCX Demo Templates/admin/screenshots/05-library-subtab.png', fullPage: true });
    
    const libraryContent = page.locator('#manage-library-subtab');
    const isVisible = await libraryContent.isVisible();
    console.log(`Library sub-tab content visible: ${isVisible}`);
  }
  
  // Click Files sub-tab
  const filesSubTab = page.locator('.sub-tab-btn[data-subtab="manage-files"]');
  if (await filesSubTab.count() > 0) {
    await filesSubTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'DCX Demo Templates/admin/screenshots/06-files-subtab.png', fullPage: true });
    
    const filesContent = page.locator('#manage-files-subtab');
    const isVisible = await filesContent.isVisible();
    console.log(`Files sub-tab content visible: ${isVisible}`);
  } else {
    console.log('Files sub-tab not found!');
  }
  
  // Click Sources sub-tab
  const sourcesSubTab = page.locator('.sub-tab-btn[data-subtab="manage-sources"]');
  if (await sourcesSubTab.count() > 0) {
    await sourcesSubTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'DCX Demo Templates/admin/screenshots/07-sources-subtab.png', fullPage: true });
    
    const sourcesContent = page.locator('#manage-sources-subtab');
    const isVisible = await sourcesContent.isVisible();
    console.log(`Sources sub-tab content visible: ${isVisible}`);
  }
  
  console.log('\n=== TEST COMPLETE ===');
});

