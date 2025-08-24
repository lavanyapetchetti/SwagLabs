// Import necessary types from Playwright
import { Page, Locator } from '@playwright/test';

// Page Object Model representing the Products (Inventory) Page
export class ProductsPage {
    readonly page: Page;
    readonly cartIcon: Locator;         // Locator for the shopping cart icon in the header
    readonly sortDropdown: Locator;     // Locator for the sorting dropdown
    readonly productPrices: Locator;    // Locator for all product price elements

    // Constructor initializes all locators using the provided Playwright page instance
    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator('.shopping_cart_link');          // Selector for cart icon
        this.sortDropdown = page.locator('.product_sort_container');  // Selector for sorting dropdown
        this.productPrices = page.locator('.inventory_item_price');   // Selector for all product prices
    }

    // Navigates directly to the products (inventory) page
    async goto() {
        await this.page.goto('/inventory.html');
    }

    // Adds a product to the cart by matching its name
    async addProductByName(productName: string) {
        await this.page
            .locator('.inventory_item') // Target all product cards
            .filter({
                has: this.page.locator(`.inventory_item_name:has-text("${productName}")`) // Filter by product name
            })
            .getByRole('button', { name: 'Add to cart' }) // Find "Add to cart" button within the filtered product
            .click(); // Click the button
    }

    // Returns the number shown on the cart badge (i.e., number of items in the cart)
    async getCartBadgeCount(): Promise<number> {
        const badge = this.page.locator('.shopping_cart_badge');
        if (await badge.isVisible()) {
            return parseInt(await badge.textContent() || '0', 10); // Parse the badge count to an integer
        }
        return 0; // Return 0 if the badge is not visible (i.e., cart is empty)
    }

    // Navigates to the cart page by clicking the cart icon
    async goToCart() {
        await this.cartIcon.click();
    }

    // Sorts products using the dropdown (e.g., by name or price)
    async sortBy(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    // Retrieves all product prices on the page and returns them as an array of numbers
    async getPrices(): Promise<number[]> {
        const pricesText = await this.productPrices.allTextContents(); // Get price text for all products
        return pricesText.map(price => parseFloat(price.replace('$', ''))); // Strip '$' and convert to float
    }
}
