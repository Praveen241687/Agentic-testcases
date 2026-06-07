import { test, expect } from '@playwright/test';

test('Validate Date of Birth field requirements and error messages', async ({ page }) => {
  await page.goto('https://www.aquacard.co.uk/aqua/online/classic/quote/');
  await page.locator('[data-testid="dobDay-input"]').first().waitFor({ state: 'visible' });

  // Attempt to submit the form without entering a Date of Birth
  await page.locator('[data-testid="submit-button"]').first().click();
  await page.locator('[data-testid="dobDay-input"]').first().waitFor({ state: 'visible' });
  await expect(page.locator('[data-testid="dobDay-input"]').first()).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('[data-testid="dobMonth-input"]').first()).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('[data-testid="dobYear-input"]').first()).toHaveAttribute('aria-invalid', 'true');

  // Enter the following Date of Birth values and verify the stated outcome for each
  const dobValues = [
    { value: '12-12-2000', valid: true },
    { value: '12-12-200', valid: false },
    { value: '12-13-2000', valid: false },
    { value: '20-02-2000a', valid: false },
    { value: '30-02-2000', valid: false },
    { value: '00-02-2000', valid: false },
  ];

  for (const { value, valid } of dobValues) {
    await page.locator('[data-testid="dobDay-input"]').first().fill(value.split('-')[0]);
    await page.locator('[data-testid="dobMonth-input"]').first().fill(value.split('-')[1]);
    await page.locator('[data-testid="dobYear-input"]').first().fill(value.split('-')[2]);
    await page.locator('[data-testid="dobDay-input"]').first().press('Tab');
    await page.locator('[data-testid="dobMonth-input"]').first().press('Tab');
    await page.locator('[data-testid="dobYear-input"]').first().press('Tab');

    if (valid) {
      await expect(page.locator('[data-testid="dobDay-input"]').first()).not.toHaveAttribute('aria-invalid', 'true');
      await expect(page.locator('[data-testid="dobMonth-input"]').first()).not.toHaveAttribute('aria-invalid', 'true');
      await expect(page.locator('[data-testid="dobYear-input"]').first()).not.toHaveAttribute('aria-invalid', 'true');
    } else {
      await expect(page.locator('[data-testid="dobDay-input"]').first()).toHaveAttribute('aria-invalid', 'true');
      await expect(page.locator('[data-testid="dobMonth-input"]').first()).toHaveAttribute('aria-invalid', 'true');
      await expect(page.locator('[data-testid="dobYear-input"]').first()).toHaveAttribute('aria-invalid', 'true');
    }
  }
});