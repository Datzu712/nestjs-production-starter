export abstract class DomainError extends Error {
    public abstract readonly code: string;
    readonly cause?: unknown;

    constructor(message: string, cause?: unknown) {
        super(message);
        this.name = this.constructor.name;
        this.cause = cause;
    }
}
export class ValidationError extends DomainError {
    readonly code = 'VALIDATION_ERROR';

    constructor(message = 'Validation error') {
        super(message);
    }
}
