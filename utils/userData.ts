export function generateEmail (): string {
    return `aqa-${Date.now()}@test.com`;
}

export const validUser = () => ({
    name: 'joy',
    lastName: 'smith',
    email: generateEmail(),
    password: 'Qwerty123',
    repeatPassword: 'Qwerty123',
});