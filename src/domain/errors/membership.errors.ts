import { DomainError } from './domain-errors';
import { ErrorCodes } from './error-codes';

export class UserAlreadyAssignedToTenantError extends DomainError {
    constructor() {
        super({
            message: 'The user is already assigned to the specified tenant',
            code: ErrorCodes.MEMBERSHIP_ALREADY_EXISTS,
        });
    }
}

export class UserAssignmentError extends DomainError {
    constructor(cause?: unknown) {
        super({
            message: 'Failed to add user to the tenant',
            cause,
            code: ErrorCodes.INTERNAL_ERROR,
        });
    }
}
