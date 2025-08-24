import { Page, Locator } from '@playwright/test';

// Define a class to model the Cart Page of a web application
export class CartPage {
    // Define properties for the page and locators on the cart page
    readonly page: Page; // Reference to the Playwright page object
    readonly cartItems: Locator; // Locator for all items listed in the cart
    readonly checkoutButton: Locator; // Locator for the checkout button

    // Constructor to initialize locators with the given Playwright page
    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item'); // Selects all elements with class 'cart_item'
        this.checkoutButton = page.locator('#checkout'); // Selects the element with ID 'checkout'
    }

    // Method to click on the checkout button
    async checkout() {
        await this.checkoutButton.click(); // Simulates user clicking the checkout button
    }
}
