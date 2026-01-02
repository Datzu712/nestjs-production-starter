export const ErrorCodes = {
    // User domain (1000-1999)
    USER_EMAIL_ALREADY_IN_USE: 'USER_1000',
    USER_NOT_FOUND: 'USER_1001',
    USER_ALREADY_EXISTS: 'USER_1002',
    INVALID_CREDENTIALS: 'USER_1003',

    // Tenant domain (2000-2999)
    TENANT_ALREADY_EXISTS: 'TENANT_2000',
    TENANT_NOT_FOUND: 'TENANT_2001',

    // Membership domain (3000-3999)
    MEMBERSHIP_ALREADY_EXISTS: 'MEMBERSHIP_3000',

    // General (9000-9999)
    VALIDATION_ERROR: 'VALIDATION_9000',
    INTERNAL_ERROR: 'INTERNAL_9999',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
