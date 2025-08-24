import { Page, expect } from '@playwright/test';

// Page Object Model representing the Login Page
export class LoginPage {
    readonly page: Page;
    readonly usernameInput;   // Locator for the username input field
    readonly passwordInput;   // Locator for the password input field
    readonly loginButton;     // Locator for the login button
    readonly errorMessage;    // Locator for any login error message
    readonly inventoryList;   // Locator for the inventory list (post-login page element)

    // Constructor initializes all locators using the provided Playwright page instance
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');        // Selector for username input
        this.passwordInput = page.locator('[data-test="password"]');        // Selector for password input
        this.loginButton = page.locator('[data-test="login-button"]');      // Selector for login button
        this.errorMessage = page.locator('[data-test="error"]');            // Selector for error message
        this.inventoryList = this.page.locator('.inventory_list');          // Selector for inventory list (seen after successful login)
    }

    // Navigates to the login page (assumes base URL is set in the Playwright config)
    async goto() {
        await this.page.goto('/');
    }

    // Fills in the login form with provided credentials and submits the form
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Asserts that the user has successfully navigated to the inventory page after login
    async assertInventoryPage() {
        await expect(this.page).toHaveURL(/inventory.html/);     // Check if URL contains 'inventory.html'
        await expect(this.inventoryList).toBeVisible();          // Check if inventory list is visible
    }
}
