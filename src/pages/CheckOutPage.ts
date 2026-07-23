import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly orderConfirmation: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.orderConfirmation = page.locator('.complete-header');
    }

    async fillDetails(user: { firstName: string; lastName: string; postalCode: string }): Promise<void> {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.postalCodeInput.fill(user.postalCode);
    }

    async continueCheckout(): Promise<void> {
        await this.continueButton.click();
    }

    async getOverviewItems(): Promise<string[]> {
        return await this.page.locator('.inventory_item_name').allTextContents();
    }

    async getOverviewPrices(): Promise<number[]> {
        const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
        return priceTexts.map(price => parseFloat(price.replace('$', '')));
    }

    async getItemTotal(): Promise<number> {
        const text = await this.page.locator('.summary_subtotal_label').textContent();
        return parseFloat(text?.replace('Item total: $', '') ?? '0');
    }

    async getTax(): Promise<number> {
        const text = await this.page.locator('.summary_tax_label').textContent();
        return parseFloat(text?.replace('Tax: $', '') ?? '0');
    }

    async getTotal(): Promise<number> {
        const text = await this.page.locator('.summary_total_label').textContent();
        return parseFloat(text?.replace('Total: $', '') ?? '0');
    }

    async finishOrder(): Promise<void> {
        await this.finishButton.click();
    }

    async verifyOrderConfirmation(): Promise<void> {
        await expect(this.orderConfirmation).toHaveText('Thank you for your order!');
    }
}
