import { test, expect } from '@playwright/test';

test('Verify navigation to Check your eligibility form', async ({ page }) => {
  await page.goto('https://www.aquacard.co.uk/credit-cards');
  await page.locator('[data-testid="check-eligibility-button"]').click();
  await page.waitForURL('**/aqua/online/classic/quote/**');
  await page.waitForLoadState('load');
  await expect(page.locator('[data-testid="check-eligibility-form"]')).toBeVisible();
});