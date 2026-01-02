import { ErrorCodes, type ErrorCode } from './error-codes';

export interface DomainErrorOptions {
    cause?: unknown;
    message: string;
    code: ErrorCode;
}

export class DomainError extends Error {
    public readonly code: ErrorCode;
    public readonly cause?: unknown;

    constructor({ message, cause, code }: DomainErrorOptions) {
        super(message);

        this.name = this.constructor.name;
        this.cause = cause;
        this.code = code;

        // Error.captureStackTrace(this, MyError);
    }
}
export class ValidationError extends DomainError {
    constructor(message = 'Validation error') {
        super({
            message,
            code: ErrorCodes.VALIDATION_ERROR,
        });
    }
}
