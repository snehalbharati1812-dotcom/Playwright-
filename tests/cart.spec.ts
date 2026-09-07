import { test, expect } from '@playwright/test';

test.describe('SauceDemo Cart Feature Tests', () => {

  test('Add Product to Cart and Verify Badge', async ({ page }) => {
    // Login workflow
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Item कार्टमध्ये ॲड करा
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Shopping Cart Icon वर '1' काउंट दिसतोय का ते तपासा
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

});