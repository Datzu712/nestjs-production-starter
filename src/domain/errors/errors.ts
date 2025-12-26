export class DomainError extends Error {
    constructor(
        message: string,
        public readonly code: string,
    ) {
        super(message);
    }
}

// Single tenant errors
export class UserAlreadyHasTenantError extends DomainError {
    constructor(userId: string) {
        super(`User with ID ${userId} already has a tenant assigned.`, 'USER_ALREADY_HAS_TENANT');
    }
}

export class TenantNotFoundError extends DomainError {
    constructor(tenantId: string) {
        super(`Tenant with ID ${tenantId} not found.`, 'TENANT_NOT_FOUND');
    }
}

export class UserAlreadyMemberOfTenantError extends DomainError {
    constructor(userId: string, tenantId: string) {
        super(
            `User with ID ${userId} is already a member of tenant with ID ${tenantId}.`,
            'USER_ALREADY_MEMBER_OF_TENANT',
        );
    }
}

// Multi-tenant errors...
