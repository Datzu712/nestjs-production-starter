import { DomainError } from './domain-errors';

export class TenantCreationError extends DomainError {
    readonly code = 'TENANT_CREATION_ERROR';

    constructor(cause?: unknown) {
        super('Failed to create tenant', cause);
    }
}
