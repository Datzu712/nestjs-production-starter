import { DomainError } from './domain-errors';
import { ErrorCodes } from './error-codes';

export class EmailAlreadyInUseError extends DomainError {
    constructor() {
        super({
            message: 'Email already in use',
            code: ErrorCodes.USER_EMAIL_ALREADY_IN_USE,
        });
    }
}

export class UserCreationError extends DomainError {
    constructor(cause?: unknown) {
        super({
            message: 'Failed to create user',
            cause,
            code: ErrorCodes.INTERNAL_ERROR,
        });
    }
}

export class UserNotFoundError extends DomainError {
    constructor() {
        super({
            message: 'User not found',
            code: ErrorCodes.USER_NOT_FOUND,
        });
    }
}
