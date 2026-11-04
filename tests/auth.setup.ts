import { test as setup, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginModal } from '../pages/LoginModal';

export const authFile = '.auth/user.json';

setup('login and save storage state', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginModal = new LoginModal(page);

  await homePage.open();
  await homePage.openLogin();
  await loginModal.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

  await expect(page).toHaveURL('/panel/garage');
  await page.context().storageState({ path: authFile });
});