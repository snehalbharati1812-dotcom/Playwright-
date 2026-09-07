import { test, expect } from '@playwright/test';

// Automated browser detection बायपास करण्यासाठी User-Agent वापरा
test.use({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
});

test.describe('Amazon Automation Tests', () => {

  test('Search Product and Verify Results', async ({ page }) => {
    // 1. Amazon open करा
    await page.goto('https://www.amazon.in/', { waitUntil: 'domcontentloaded' });

    // 2. Anti-Bot Page आले असल्यास 'Continue shopping' वर क्लिक करा
    const continueBtn = page.getByRole('button', { name: 'Continue shopping' });
    if (await continueBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await continueBtn.click();
      await page.waitForLoadState('domcontentloaded');
    }

    // 3. Search Box मध्ये 'Laptop' टाका
    const searchInput = page.locator('#twotabsearchtextbox');
    await searchInput.fill('Laptop');

    // 4. Search Button वर क्लिक करा
    await page.locator('#nav-search-submit-button').click();

    // 5. Verification
    const searchResultHeader = page.locator('span.a-color-state');
    await expect(searchResultHeader).toContainText('Laptop');
  });

});