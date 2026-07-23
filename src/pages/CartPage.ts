import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async getCartItemNames(): Promise<string[]> {
        return await this.page.locator('.inventory_item_name').allTextContents();
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async removeItemByName(productName: string): Promise<void> {
        await this.page
            .locator('.cart_item', { hasText: productName })
            .getByRole('button', { name: 'Remove' })
            .click();
    }
}
