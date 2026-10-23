import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationModal } from '../pages/RegistrationModal'; 
import { validUser } from '../utils/userData'; 

test.describe ( 'registrationForm', () => {
  let homePage: HomePage;
  let registration: RegistrationModal;

  test.beforeEach (async ({page}) => {
    homePage = new HomePage (page);
    registration = new RegistrationModal (page);
    await homePage.open();
    await homePage.openRegistration();
  });

  test('positive: register with valid data', async ({page}) => {
    await registration.fillForm(validUser());
    await registration.submit();
    await expect(page).toHaveURL('/panel/garage'); 
    await expect(page.getByRole('heading', {name: 'Garage'})).toBeVisible();
  });

  const red = 'rgb(220, 53, 69)';
  const requiredCases  = [
    {title: 'Name', input: () => registration.inputName, error: () => registration.inputNameError, text: 'Name required'},
    {title: 'Last name', input: () => registration.inputLastName, error: () => registration.inputLastNameError, text: 'Last name required'},
    {title: 'Email', input: () => registration.inputEmail, error: () => registration.inputEmailError, text: 'Email required'},
    {title: 'Password', input: () => registration.inputPassword, error: () => registration.inputPasswordError, text: 'Password required' },
    {title: 'Re-enter password', input: () => registration.inputReEnterPassword, error: () => registration.inputReEnterPasswordError, text: 'Re-enter password required'},
  ]

 for (const c of requiredCases) {
  test(`negative: ${c.title} is empty`, async () => {
    await c.input().focus();
    await c.input().blur();
    await expect(c.error()).toHaveText(c.text);
    await expect(c.input()).toHaveCSS('border-color', red);
    await expect(registration.registerButton).toBeDisabled();

    });
  }

  const invalidNames = [
    {value: 'Ліля', error: 'Name is invalid'},
    {value: '123', error: 'Name is invalid'},
    {value: 'A', error: 'Name has to be from 2 to 20 characters long'},
    {value: 'A'.repeat(21), error: 'Name has to be from 2 to 20 characters long'},
  ];

  for(const {value, error} of invalidNames) {
    test(`negative: Name "${value}"`, async () => {
      await registration.inputName.fill(value);
      await registration.inputName.blur();

      await expect(registration.inputNameError).toHaveText(error);
      await expect(registration.inputName).toHaveCSS('border-color', red);

    });
  }

  test('negative: Last name too long', async () => {
    await registration.inputLastName.fill('A'.repeat(21));
    await registration.inputLastName.blur();

    await expect(registration.inputLastNameError).toHaveText('Last name has to be from 2 to 20 characters long');
    await expect(registration.inputLastName).toHaveCSS('border-color', red);
  });

  const invalidEmails = ['abc', 'abc@', 'abc@test'];

  for(const value of invalidEmails) {
    test(`negative: Email "${value}" is incorrect`, async () => {

  
    await registration.inputEmail.fill(value);
    await registration.inputEmail.blur();

    await expect(registration.inputEmailError).toHaveText('Email is incorrect');
    await expect(registration.inputEmail).toHaveCSS('border-color', red);    
  });
  }

  const passwordError =
  'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';

  const invalidPasswords = [
    { title: 'too short',        value: 'Qwe123' },
    { title: 'too long',         value: 'Qwerty1234567890' },
    { title: 'no capital letter', value: 'qwerty123' },
    { title: 'no small letter',  value: 'QWERTY123' },
    { title: 'no digit',         value: 'Qwertyuiop' },
  ];

  for(const {title, value} of invalidPasswords) {
    test(`negative: Pasword "${title}"`, async () => {
      await registration.inputPassword.fill(value);
      await registration.inputPassword.blur();

      await expect(registration.inputPasswordError).toHaveText(passwordError);
      await expect(registration.inputPassword).toHaveCSS('border-color', red);

    });
  }

  test('negative: passwords do not match', async () => {
    await registration.inputPassword.fill('Testt234');
    await registration.inputReEnterPassword.fill('Testt12345');
    await registration.inputReEnterPassword.blur();

    await expect(registration.inputReEnterPasswordError).toHaveText('Passwords do not match');
    await expect(registration.inputReEnterPassword).toHaveCSS('border-color', red);

  });

  test('negative: Register button is disabled with invalid data', async () => {
    await registration.fillForm ({
      name: 'w',
      lastName: 'e',
      email: 'asd',
      password: 'ed',
      repeatPassword: 'ew',
    });
    await expect(registration.registerButton).toBeDisabled();
  })


});

