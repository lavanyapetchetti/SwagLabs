import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com/',
    USERNAME: process.env.USERNAME || 'standard_user',
    PASSWORD: process.env.PASSWORD || 'secret_sauce',
};
