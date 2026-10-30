import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly signupButton: Locator;

    constructor (private page: Page) {
        this.signupButton = page.getByRole('button', {name: 'Sign up'});
    }

    async open () {
        await this.page.goto('/');
    }

    async openRegistration () {
        await this.signupButton.click();
    }
}