/**
 * Validates whether a given string is a properly formatted email address.
 *
 * This function uses a regular expression to check if the input string
 * adheres to the general structure of an email address, which includes:
 * - A local part (before the '@' symbol) that does not contain whitespace.
 * - An '@' symbol separating the local part and the domain.
 * - A domain part (after the '@' symbol) that includes at least one dot ('.').
 *
 * @param { string } email - The email address string to validate.
 * @example
 * validateEmail('example@example.com'); // true
 * validateEmail('invalid-email'); // false
 * validateEmail('user@domain'); // false
 * validateEmail('user@domain.com'); // true
 * validateEmail('user@sub.domain.com'); // true
 * validateEmail('user@domain..com'); // false
 *
 * @returns `true` if the input string is a valid email address, otherwise `false`.
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
