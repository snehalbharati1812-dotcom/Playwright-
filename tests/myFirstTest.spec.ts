import { test, expect } from '@playwright/test';

test('SauceDemo Valid Login Test', async ({ page }) => {
  // 1. वेबसाईटवर जा
  await page.goto('https://www.saucedemo.com/');

  // 2. Playwright Locators द्वारे Username आणि Password एंटर करा
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // 3. Playwright getByRole वापरून Login बटनवर क्लिक करा
  await page.getByRole('button', { name: 'Login' }).click();

  // 4. Verification: URL मध्ये 'inventory.html' आले आहे का ते तपासा
  await expect(page).toHaveURL(/.*inventory.html/);
});