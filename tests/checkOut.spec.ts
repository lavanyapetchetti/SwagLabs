// Validate that a user can successfully complete the checkout process
import { test, expect } from '@playwright/test';
import { ProductsPage } from '../src/pages/ProductsPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckOutPage';
import checkoutUser from '../test-data/checkOut.json';
import productData from '../test-data/products.json';

test.describe('Checkout Flow', () => {
    test('Complete checkout with valid details (from JSON)', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        const expectedItems = productData.checkoutProducts.map(p => p.name);
        const expectedPrices = productData.checkoutProducts.map(p => p.price);

        // Add products dynamically from JSON
        await productsPage.goto();
        for (const product of productData.checkoutProducts) {
            await productsPage.addProductByName(product.name);
        }

        // Go to cart
        await productsPage.goToCart();
        await expect(cartPage.cartItems).toHaveCount(productData.checkoutProducts.length);

        // Checkout with details from JSON
        await cartPage.checkout();
        await checkoutPage.fillDetails(checkoutUser.validUser);
        await checkoutPage.continueCheckout();

        // Validate items in overview
        const overviewItems = await checkoutPage.getOverviewItems();
        expect(overviewItems).toEqual(expectedItems);

        // Validate prices match
        const overviewPrices = await checkoutPage.getOverviewPrices();
        expect(overviewPrices).toEqual(expectedPrices);

        // Validate Item Total = sum of prices
        const itemTotal = await checkoutPage.getItemTotal();
        const calculatedTotal = expectedPrices.reduce((a, b) => a + b, 0);
        expect(itemTotal).toBeCloseTo(calculatedTotal, 2);

        // Validate Tax and Total
        const tax = await checkoutPage.getTax();
        const total = await checkoutPage.getTotal();
        expect(total).toBeCloseTo(itemTotal + tax, 2);

        // Finish checkout
        await checkoutPage.finishOrder();

        // Verify order confirmation
        await checkoutPage.verifyOrderConfirmation();
    });
});
