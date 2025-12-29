import { DomainError } from './domain-errors';

export class EmailAlreadyInUseError extends DomainError {
    readonly code = 'EMAIL_ALREADY_IN_USE';

    constructor() {
        super('Email already in use');
    }
}

export class UserCreationError extends DomainError {
    readonly code = 'USER_CREATION_ERROR';

    constructor(cause?: unknown) {
        super('Failed to create user', cause);
    }
}

export class UserNotFoundError extends DomainError {
    readonly code = 'USER_NOT_FOUND';

    constructor() {
        super('User not found');
    }
}
