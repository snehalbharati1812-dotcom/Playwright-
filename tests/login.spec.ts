import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login Feature Tests', () => {

  // प्रत्येक टेस्ट आधी Login पेजवर जाण्यासाठी (Hooks)
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

 test('Valid Login', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // मुद्दाम टाकलेली चुकीची लिंक (Test Fail होण्यासाठी)
  await expect(page).toHaveURL(/.*inventory.html/); 
});

  test('Locked Out User Login - Expect Failure Error', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Error message तपासणे (Assertion)
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Sorry, this user has been locked out.');
  });

});