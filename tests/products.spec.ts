// Verify that items on the product page are sorted in ascending order
import { test, expect } from '@playwright/test';
import { ProductsPage } from '../src/pages/ProductsPage';

test('Sort products by Price (low to high) and verify ascending order', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.goto();
    // Sort by Price (low to high)
    await productsPage.sortBy('lohi'); // value for low to high

    // Get all prices
    const prices = await productsPage.getPrices();

    // Verify prices are in ascending order
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
});
