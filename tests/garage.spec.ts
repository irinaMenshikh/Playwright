import { test, expect } from '../fixtures';

test.describe('Garage (logged in user)', () => {
  test('user is logged in and sees Garage page', async ({ userGaragePage }) => {
    await expect(userGaragePage.page).toHaveURL('/panel/garage');
    await expect(userGaragePage.heading).toBeVisible();
    await expect(userGaragePage.addCarButton).toBeVisible();
  });
});