import { Page, Locator, expect } from '@playwright/test';

// Page Object Model for the Checkout Page
export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;        // Input field for user's first name
    readonly lastNameInput: Locator;         // Input field for user's last name
    readonly postalCodeInput: Locator;       // Input field for user's postal code
    readonly continueButton: Locator;        // Button to proceed to the overview page
    readonly finishButton: Locator;          // Button to complete the order
    readonly orderConfirmation: Locator;     // Element displaying order confirmation text

    // Constructor initializes all locators using the Playwright page instance
    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');               // Locate first name input
        this.lastNameInput = page.locator('#last-name');                // Locate last name input
        this.postalCodeInput = page.locator('#postal-code');            // Locate postal code input
        this.continueButton = page.locator('#continue');                // Locate continue button
        this.finishButton = page.locator('#finish');                    // Locate finish button
        this.orderConfirmation = page.locator('.complete-header');      // Locate confirmation message
    }

    // Fills in checkout form with provided user details
    // Accepts an object with firstName, lastName, and postalCode
    async fillDetails(user: { firstName: string; lastName: string; postalCode: string }) {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.postalCodeInput.fill(user.postalCode);
    }

    // Clicks the "Continue" button to proceed with checkout
    async continueCheckout() {
        await this.continueButton.click();
    }

    // Returns a list of item names from the checkout overview
    async getOverviewItems(): Promise<string[]> {
        return await this.page.locator('.inventory_item_name').allTextContents();
    }

    // Returns an array of item prices as numbers from the checkout overview
    async getOverviewPrices(): Promise<number[]> {
        const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
        return priceTexts.map(price => parseFloat(price.replace('$', '')));
    }

    // Gets the item subtotal (before tax and total)
    async getItemTotal(): Promise<number> {
        const text = await this.page.locator('.summary_subtotal_label').textContent();
        return parseFloat(text?.replace('Item total: $', '') || '0');
    }

    // Gets the tax amount displayed in the checkout summary
    async getTax(): Promise<number> {
        const text = await this.page.locator('.summary_tax_label').textContent();
        return parseFloat(text?.replace('Tax: $', '') || '0');
    }

    // Gets the final total (item total + tax)
    async getTotal(): Promise<number> {
        const text = await this.page.locator('.summary_total_label').textContent();
        return parseFloat(text?.replace('Total: $', '') || '0');
    }

    // Completes the checkout by clicking the "Finish" button
    async finishOrder() {
        await this.finishButton.click();
    }

    // Verifies that the order confirmation message is displayed correctly
    async verifyOrderConfirmation() {
        await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
    }
}
