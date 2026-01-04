import { DomainError } from './domain-errors';
import { ErrorCodes } from './error-codes';

/**
 * User already exists error
 */
export class UserAlreadyExistsError extends DomainError {
    constructor(identifier: string, identifierType: 'email' | 'id' = 'email') {
        super({
            code: ErrorCodes.USER_ALREADY_EXISTS,
            message: `User with ${identifierType} "${identifier}" already exists`,
            context: {
                identifier,
                identifierType,
            },
        });
    }
}

/**
 * User not found error
 */
export class UserNotFoundError extends DomainError {
    constructor(identifier: string) {
        super({
            code: ErrorCodes.USER_NOT_FOUND,
            message: `User "${identifier}" not found`,
            context: { identifier },
        });
    }
}

/**
 * Email already in use error
 */
export class EmailAlreadyInUseError extends DomainError {
    constructor(email: string) {
        super({
            code: ErrorCodes.USER_EMAIL_ALREADY_IN_USE,
            message: `Email "${email}" is already in use`,
            context: { email },
        });
    }
}

/**
 * Invalid email format error
 */
export class InvalidEmailError extends DomainError {
    constructor(email: string) {
        super({
            code: ErrorCodes.USER_INVALID_EMAIL,
            message: `Invalid email format: "${email}"`,
            context: { email },
        });
    }
}

/**
 * Invalid password error
 */
export class InvalidPasswordError extends DomainError {
    constructor(reason?: string) {
        super({
            code: ErrorCodes.USER_INVALID_PASSWORD,
            message: reason ? `Invalid password: ${reason}` : 'Invalid password',
            context: reason ? { reason } : undefined,
        });
    }
}

/**
 * User creation failed error
 */
export class UserCreationError extends DomainError {
    constructor(cause?: unknown) {
        super({
            code: ErrorCodes.INTERNAL_ERROR,
            message: 'Failed to create user',
            context: cause ? { cause } : undefined,
        });
    }
}
