import { DomainError } from './domain-errors';
import { ErrorCodes } from './error-codes';

export class MembershipAlreadyExistsError extends DomainError {
    constructor(userId: string, tenantId: string) {
        super({
            code: ErrorCodes.MEMBERSHIP_ALREADY_EXISTS,
            message: `Membership already exists for user "${userId}" in tenant "${tenantId}"`,
            context: { userId, tenantId },
        });
    }
}

export class MembershipNotFoundError extends DomainError {
    constructor(userId: string, tenantId: string) {
        super({
            code: ErrorCodes.MEMBERSHIP_NOT_FOUND,
            message: `Membership not found for user "${userId}" in tenant "${tenantId}"`,
            context: { userId, tenantId },
        });
    }
}
export class InvalidMembershipRoleError extends DomainError {
    constructor(role: string) {
        super({
            code: ErrorCodes.MEMBERSHIP_INVALID_ROLE,
            message: `Invalid membership role: "${role}"`,
            context: { role },
        });
    }
}

export class InsufficientPermissionsError extends DomainError {
    constructor(requiredRole: string, currentRole: string) {
        super({
            code: ErrorCodes.MEMBERSHIP_INSUFFICIENT_PERMISSIONS,
            message: `Insufficient permissions. Required: "${requiredRole}", Current: "${currentRole}"`,
            context: { requiredRole, currentRole },
        });
    }
}

export class MembershipCreationError extends DomainError {
    constructor(cause?: unknown) {
        super({
            code: ErrorCodes.INTERNAL_ERROR,
            message: 'Failed to create membership',
            cause,
        });
    }
}
