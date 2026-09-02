const { test } = require('@playwright/test');

test('Capture Content Hub UI for optimization', async ({ page }) => {
  await page.goto('http://localhost:8001/admin/content-hub.html');
  await page.waitForLoadState('networkidle');
  
  // Take full page screenshot
  await page.screenshot({ 
    path: 'admin/ux-screenshots/jobs-tab-overview.png', 
    fullPage: true 
  });
  
  // Click on first job card to see the detail modal
  await page.click('.card.rounded-lg.p-5.cursor-pointer');
  await page.waitForTimeout(500);
  
  await page.screenshot({ 
    path: 'admin/ux-screenshots/job-report-modal.png', 
    fullPage: true 
  });
  
  // Close modal by clicking close button
  const closeButton = page.locator('#job-report-modal button[onclick="closeJobReport()"]');
  if (await closeButton.isVisible()) {
    await closeButton.click();
    await page.waitForTimeout(500);
  }
  
  // Navigate to Library tab
  await page.click('[data-subtab="manage-library"]');
  await page.waitForTimeout(300);
  
  await page.screenshot({ 
    path: 'admin/ux-screenshots/library-tab.png', 
    fullPage: true 
  });
  
  // Navigate to Sources tab
  await page.click('[data-subtab="manage-sources"]');
  await page.waitForTimeout(300);
  
  await page.screenshot({ 
    path: 'admin/ux-screenshots/sources-tab.png', 
    fullPage: true 
  });
  
  // Navigate to Transform > Metadata
  await page.click('[data-tab="transform"]');
  await page.waitForTimeout(300);
  
  await page.screenshot({ 
    path: 'admin/ux-screenshots/transform-metadata.png', 
    fullPage: true 
  });
  
  // Transform > Enrichment
  await page.click('[data-subtab="transform-enrichment"]');
  await page.waitForTimeout(300);
  
  await page.screenshot({ 
    path: 'admin/ux-screenshots/transform-enrichment.png', 
    fullPage: true 
  });
  
  // Transform > Quality
  await page.click('[data-subtab="transform-quality"]');
  await page.waitForTimeout(300);
  
  await page.screenshot({ 
    path: 'admin/ux-screenshots/transform-quality.png', 
    fullPage: true 
  });
  
  console.log('✅ All screenshots captured');
});

