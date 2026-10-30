import { Page, Locator } from '@playwright/test';

export class RegistrationModal {
    readonly page: Page;
    readonly inputName: Locator;
    readonly inputLastName: Locator;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly inputReEnterPassword: Locator;
    readonly registerButton: Locator;
    
    readonly inputNameError: Locator;
    readonly inputLastNameError: Locator;
    readonly inputEmailError: Locator;
    readonly inputPasswordError: Locator;
    readonly inputReEnterPasswordError: Locator;

    constructor (page: Page) {
        this.page = page;
        this.inputName = page.locator('#signupName');
        this.inputLastName = page.locator('#signupLastName');
        this.inputEmail = page.locator('#signupEmail');
        this.inputPassword = page.locator('#signupPassword');
        this.inputReEnterPassword = page.locator('#signupRepeatPassword');
        this.registerButton = page.getByRole('button', {name: 'Register'});
        this.inputNameError = page.locator('#signupName + .invalid-feedback');
        this.inputLastNameError = page.locator('#signupLastName + .invalid-feedback');
        this.inputEmailError = page.locator('#signupEmail + .invalid-feedback');
        this.inputPasswordError = page.locator('#signupPassword + .invalid-feedback');
        this.inputReEnterPasswordError = page.locator('#signupRepeatPassword + .invalid-feedback');

    }

    async fillForm (data: {name: string; lastName: string; email: string; password: string; repeatPassword: string; }) {
        await this.inputName.fill(data.name);
        await this.inputLastName.fill(data.lastName);
        await this.inputEmail.fill(data.email);
        await this.inputPassword.fill(data.password);
        await this.inputReEnterPassword.fill(data.repeatPassword);
    }

    async submit() {
        await this.registerButton.click();
    }

}