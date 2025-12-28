import { DomainError } from './domain-errors';

export class UserAlreadyAssignedToTenantError extends DomainError {
    readonly code = 'USER_ALREADY_ASSIGNED_TO_TENANT';

    constructor() {
        super('The user is already assigned to the specified tenant');
    }
}

export class UserAssignmentError extends DomainError {
    readonly code = 'USER_CANNOT_BE_ADDED_TO_TENANT';

    constructor(cause?: unknown) {
        super('Failed to add user to the tenant', cause);
    }
}
