const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Content Tables prototype', () => {
  test('configure waterfall automation and capture layout', async ({ page }) => {
    const filePath = path.join(__dirname, 'content-tables.html');
    await page.goto(`file://${filePath}`);
    await page.setViewportSize({ width: 1600, height: 1000 });

    await expect(page.locator('th:has-text("Personas")')).toBeVisible();
    await expect(page.locator('th:has-text("Locales")')).toBeVisible();
    await expect(page.locator('th:has-text("Metadata")')).toBeVisible();

    const addColumnTrigger = page.locator('#column-menu-trigger');
    await expect(addColumnTrigger).toBeVisible();
    await addColumnTrigger.click();
    await page.waitForSelector('#column-menu', { state: 'visible' });
    await page.click('#column-menu button[data-column-action="waterfall"]');

    const inspector = page.locator('#automation-inspector');
    await expect(inspector).toBeVisible();
    await page.waitForSelector('#waterfall-list .sequence-item');
    await expect(inspector.locator('#waterfall-list .sequence-item')).toHaveCount(4);

    const stageSelect = inspector.locator('.sequence-stage').first();
    await expect(stageSelect).toHaveValue('ingest');

    const autoToggle = inspector.locator('input[data-run-setting="autoUpdate"]');
    await expect(autoToggle).toBeChecked();
    await autoToggle.click();
    await expect(autoToggle).not.toBeChecked();

    await page.screenshot({
      path: 'admin/screenshots/content-tables.png',
      fullPage: true
    });
  });
});
