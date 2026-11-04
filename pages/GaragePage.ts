import { Page, Locator, expect } from '@playwright/test';

export class GaragePage {
  readonly heading: Locator;
  readonly addCarButton: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Garage' });
    this.addCarButton = page.getByRole('button', { name: 'Add car' });
  }

  async open() {
    await this.page.goto('/panel/garage');
  }
}