// Confirm products are added to the cart and reflected in the cart badge
import { test, expect } from '@playwright/test';
import { ProductsPage } from '../src/pages/ProductsPage';
import products from '../test-data/products.json';

test('Add two specific products to the cart and verify cart badge', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.goto();

    // Add 2 specific products (first two from products.json)
    const selectedProducts = products.checkoutProducts.slice(0, 2);
    for (const product of selectedProducts) {
        await productsPage.addProductByName(product.name);
    }

    // Verify cart badge shows correct number
    const cartCount = await productsPage.getCartBadgeCount();
    expect(cartCount).toBe(selectedProducts.length);
});
