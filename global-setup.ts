import { FullConfig, chromium } from '@playwright/test';
import { ENV } from './src/utils/env';

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', ENV.USERNAME);
    await page.fill('#password', ENV.PASSWORD);
    await page.click('#login-button');

    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;
