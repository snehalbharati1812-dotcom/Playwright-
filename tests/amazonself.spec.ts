import { test, expect } from '@playwright/test';

test.use({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
});

test.describe('Amazon Self Workflows', () => {

  test('Amazon Self - Today\'s Deals Home & Kitchen Search with Review Pause', async ({ page }) => {
    // 1. Open Amazon India
    await page.goto('https://www.amazon.in/', { waitUntil: 'domcontentloaded' });

    // Anti-Bot Protection Handling
    const continueBtn = page.getByRole('button', { name: 'Continue shopping' });
    if (await continueBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await continueBtn.click();
      await page.waitForLoadState('domcontentloaded');
    }

    // 2. Go to Today's Deals
    const todaysDealsLink = page.getByRole('link', { name: "Today's Deals", exact: false });
    await todaysDealsLink.click();

    // 3. Select "Home & Kitchen" Category Filter
    const homeKitchenFilter = page.getByRole('button', { name: 'Home & Kitchen' }).or(page.getByText('Home & Kitchen', { exact: true }));
    if (await homeKitchenFilter.first().isVisible({ timeout: 5000 }).catch(() => false)) {
      await homeKitchenFilter.first().click();
    }

    // 4. Search for "airfryer"
    const searchInput = page.locator('#twotabsearchtextbox');
    await searchInput.fill('airfryer');
    await page.locator('#nav-search-submit-button').click();

    // 5. Verification
    const searchResultHeader = page.locator('span.a-color-state');
    await expect(searchResultHeader).toContainText('airfryer');

    // 6. Review Pause: Wait for 5 seconds to review products visually
    await page.waitForTimeout(5000);
  });

});