import { test, expect } from '@playwright/test';

test.describe('SauceDemo Checkout Feature Tests', () => {

  test('Complete End-to-End Checkout Workflow', async ({ page }) => {
    // 1. Login
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // 2. Product Add to Cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();

    // 3. Checkout Process
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('First Name').fill('Rahul');
    await page.getByPlaceholder('Last Name').fill('Sharma');
    await page.getByPlaceholder('Zip/Postal Code').fill('411001');
    await page.getByRole('button', { name: 'Continue' }).click();

    // 4. Finish Order
    await page.getByRole('button', { name: 'Finish' }).click();

    // 5. Verification: Order Confirmation Message
    const thankYouHeader = page.getByRole('heading', { name: 'Thank you for your order!' });
    await expect(thankYouHeader).toBeVisible();
  });

});