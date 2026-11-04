import { test as base } from '@playwright/test';
import { GaragePage } from '../pages/GaragePage';

type MyFixtures = {
  userGaragePage: GaragePage;
};

export const test = base.extend<MyFixtures>({
  userGaragePage: async ({ browser, baseURL, httpCredentials }, use) => {
    const context = await browser.newContext({
      storageState: '.auth/user.json',
      baseURL,
      httpCredentials,
    });
    const page = await context.newPage();
    const garagePage = new GaragePage(page);

    await garagePage.open();
    await use(garagePage);

    await context.close();
  },
});

export { expect } from '@playwright/test';