// Verify that a user can log in with valid credentials
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ENV } from '../src/utils/env';

test.use({ storageState: undefined }); // Disable storageState for login test

test.describe('Login Tests', () => {
    test('Login with valid credentials (standard_user)', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
        await loginPage.assertInventoryPage();
    });

    test.describe.skip('Login Tests - Multiple Users', () => {
        const users = [
            { username: 'standard_user', shouldLogin: true },
            { username: 'locked_out_user', shouldLogin: false },
            { username: 'problem_user', shouldLogin: true },
            { username: 'performance_glitch_user', shouldLogin: true },
            { username: 'error_user', shouldLogin: true },
            { username: 'visual_user', shouldLogin: true },
        ];

        users.forEach(({ username, shouldLogin }) => {
            test(`Login attempt with ${username}`, async ({ page }) => {
                const loginPage = new LoginPage(page);

                await loginPage.goto();
                await loginPage.login(username, ENV.PASSWORD);

                if (shouldLogin) {
                    await loginPage.assertInventoryPage();
                } else {
                    await expect(loginPage.errorMessage).toBeVisible();
                }
            });
        });
    });
});
