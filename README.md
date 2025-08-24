# Playwright + TypeScript + Allure Framework 🚀

This project is a **UI Test Automation Framework** built with [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/).  
It follows the **Page Object Model (POM)** design pattern for better maintainability and scalability, supports **multiple environments**, and generates professional reports with **Allure** and **Playwright HTML Report**.

---

## 🚀 Setup & Installation

### 1. Prerequisites
Ensure you have the following installed:
- **Node.js** (≥ 16.x)
- **Yarn** (recommended package manager)
- **Playwright**

### 2. Clone the Repository
```sh
git clone https://github.com/lavanyapetchetti/SwagLabs.git
cd SwagLabs
```

### 3. Install Dependencies
```sh
yarn install
```

### 4. Install Playwright Browsers
```sh
yarn playwright install
```

### 5. Configure Environments

This framework supports multiple environments via `.env` files.  
You can create different environment files for **staging** and **production**:

#### Example `.env.stg`
```env
BASE_URL=https://staging.saucedemo.com/
USERNAME=stg_user
PASSWORD=stg_password
```

#### Example `.env.prod`
```env
BASE_URL=https://www.saucedemo.com/
USERNAME=standard_user
PASSWORD=secret_sauce
```
The env.ts utility loads the correct environment variables based on the ENV flag or the script used

---

## 📝 Running Tests

### Run All Tests (Headless)
```sh
yarn test
```

### Run a Specific Test File
```sh
yarn test tests/login.spec.ts
```

### Run Tests in Headed Mode (browser visible)
```sh
yarn test:headed
```

### Run Tests on prod env
```sh
yarn test:prod
```

---

## 📊 Reports

### Playwright HTML Report
Generate & open the built-in Playwright report:
```sh
yarn report
```

### Allure Report
Run tests:
```sh
yarn test
```

Generate report:
```sh
yarn allure:generate
```

Open report:
```sh
yarn allure:open
```

---

## 📑 Available Scripts
From `package.json`:

| Script              | Description                      |
|---------------------|----------------------------------|
| `yarn test`         | Run all Playwright tests (headless) |
| `yarn test:headed`  | Run tests in headed mode         |
| `yarn test:prod`    | Run tests on prod  env           |
| `yarn test:staging` | Run tests on staging env         |
| `yarn report`       | Open Playwright HTML report      |
| `yarn allure:generate`| Generate Allure report           |
| `yarn allure:open`  | Open Allure report               |

---

## 🧪 Example Test

Login test with multiple users (`tests/login.spec.ts`):
```ts
test(`Login attempt with standard_user`, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', ENV.PASSWORD);
  await loginPage.assertInventoryPage();
});
```

---

✨ You’re all set! Run tests, generate reports, and track results with ease.  
