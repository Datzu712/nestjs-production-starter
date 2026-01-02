import { DomainError } from './domain-errors';
import { ErrorCodes } from './error-codes';

export class TenantCreationError extends DomainError {
    constructor(cause?: unknown) {
        super({
            message: 'Failed to create tenant',
            cause,
            code: ErrorCodes.INTERNAL_ERROR,
        });
    }
}

export class TenantNotFoundError extends DomainError {
    constructor() {
        super({
            message: 'The specified tenant was not found',
            code: ErrorCodes.TENANT_NOT_FOUND,
        });
    }
}
