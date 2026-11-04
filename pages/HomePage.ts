import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly signupButton: Locator;
    readonly signInButton: Locator;

    constructor (private page: Page) {
        this.signupButton = page.getByRole('button', {name: 'Sign up'});
        this.signInButton = page.getByRole('button', {name: 'Sign In'});
    }

    async open () {
        await this.page.goto('/');
    }

    async openRegistration () {
        await this.signupButton.click();
    }

    async openLogin () {
        await this.signInButton.click();
    }
}