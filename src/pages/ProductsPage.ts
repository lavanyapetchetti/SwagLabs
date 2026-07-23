import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    readonly cartIcon: Locator;
    readonly sortDropdown: Locator;
    readonly productPrices: Locator;

    constructor(page: Page) {
        super(page);
        this.cartIcon = page.locator('.shopping_cart_link');
        this.sortDropdown = page.locator('.product_sort_container');
        this.productPrices = page.locator('.inventory_item_price');
    }

    async goto(): Promise<void> {
        await super.goto('/inventory.html');
    }

    async addProductByName(productName: string): Promise<void> {
        await this.page
            .locator('.inventory_item', { hasText: productName })
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }

    async getCartBadgeCount(): Promise<number> {
        const badge = this.page.locator('.shopping_cart_badge');
        if (await badge.isVisible()) {
            return parseInt((await badge.textContent()) ?? '0', 10);
        }
        return 0;
    }

    async goToCart(): Promise<void> {
        await this.cartIcon.click();
    }

    async sortBy(option: string): Promise<void> {
        await this.sortDropdown.selectOption(option);
    }

    async getPrices(): Promise<number[]> {
        const pricesText = await this.productPrices.allTextContents();
        return pricesText.map(price => parseFloat(price.replace('$', '')));
    }

    async getProductNames(): Promise<string[]> {
        return await this.page.locator('.inventory_item_name').allTextContents();
    }

    async getProductPrice(productName: string): Promise<number> {
        const priceText = await this.page
            .locator('.inventory_item', { hasText: productName })
            .locator('.inventory_item_price')
            .textContent();
        return parseFloat((priceText ?? '$0').replace('$', ''));
    }
}
