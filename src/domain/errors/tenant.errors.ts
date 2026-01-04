import { DomainError } from './domain-errors';
import { ErrorCodes } from './error-codes';

/**
 * Tenant already exists error
 */
export class TenantAlreadyExistsError extends DomainError {
    constructor(identifier: string, identifierType: 'slug' | 'id' = 'slug') {
        super({
            code: ErrorCodes.TENANT_ALREADY_EXISTS,
            message: `Tenant with ${identifierType} "${identifier}" already exists`,
            context: { identifier, identifierType },
        });
    }
}

/**
 * Tenant not found error
 */
export class TenantNotFoundError extends DomainError {
    constructor(identifier: string) {
        super({
            code: ErrorCodes.TENANT_NOT_FOUND,
            message: `Tenant "${identifier}" not found`,
            context: { identifier },
        });
    }
}

/**
 * Tenant creation failed error
 */
export class TenantCreationError extends DomainError {
    constructor(cause?: unknown) {
        super({
            code: ErrorCodes.INTERNAL_ERROR,
            message: 'Failed to create tenant',
            cause,
        });
    }
}
