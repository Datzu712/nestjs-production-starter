/**
 * Domain error codes registry
 * Pure business domain codes without infrastructure dependencies
 * Organized by domain with numeric ranges for scalability
 */
export const ErrorCodes = {
    // User domain (1000-1999)
    USER_ALREADY_EXISTS: 'USER_1000',
    USER_NOT_FOUND: 'USER_1001',
    USER_EMAIL_ALREADY_IN_USE: 'USER_1002',
    USER_INVALID_EMAIL: 'USER_1003',
    USER_INVALID_PASSWORD: 'USER_1004',

    // Tenant domain (2000-2999)
    TENANT_ALREADY_EXISTS: 'TENANT_2000',
    TENANT_NOT_FOUND: 'TENANT_2001',

    // Membership domain (3000-3999)
    MEMBERSHIP_ALREADY_EXISTS: 'MEMBERSHIP_3000',
    MEMBERSHIP_NOT_FOUND: 'MEMBERSHIP_3001',
    MEMBERSHIP_INVALID_ROLE: 'MEMBERSHIP_3002',
    MEMBERSHIP_INSUFFICIENT_PERMISSIONS: 'MEMBERSHIP_3003',

    // General validation (9000-9999)
    VALIDATION_ERROR: 'VALIDATION_9000',
    INTERNAL_ERROR: 'INTERNAL_9999',
} as const;

/**
 * Type representing valid error code values
 */
export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

/**
 * Converts an error code to a human-readable title format.
 *
 * @param { ErrorCode } code - The error code to convert (You may use a better way to generate titles than this simple implementation)
 * @returns A formatted title string with the first letter capitalized and underscores replaced with spaces,
 *          or undefined if the error code is not found in ErrorCodes
 *
 * @example
 * ```ts
 * getExceptionTitle(ErrorCodes.USER_NOT_FOUND) // Returns "User not found"
 * getExceptionTitle(ErrorCodes.INVALID_INPUT) // Returns "Invalid input"
 * ```
 */
export function getExceptionTitle(code: ErrorCode): string | undefined {
    const targetError = Object.entries(ErrorCodes).find(([, value]) => value == code);

    if (!targetError?.length) {
        return undefined;
    }

    const titleParts = targetError[0].replaceAll('_', ' ').toLowerCase();
    return titleParts.charAt(0).toUpperCase() + titleParts.slice(1);
}
