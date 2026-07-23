import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly inventoryList: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.inventoryList = page.locator('.inventory_list');
    }

    async goto(): Promise<void> {
        await super.goto('/');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async isInventoryPage(): Promise<boolean> {
        await expect(this.page).toHaveURL(/inventory.html/);
        await expect(this.inventoryList).toBeVisible();
        return true;
    }

    async assertInventoryPage(): Promise<void> {
        await this.isInventoryPage();
    }
}
