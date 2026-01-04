import { type ErrorCode, ErrorCodes } from './error-codes';

export interface DomainErrorOptions {
    cause?: unknown;
    message?: string;
    context?: Record<string, unknown>;
    code: ErrorCode;
}

/**
 * Pure domain error class without infrastructure dependencies
 * Base class for all domain-specific errors
 */
export abstract class DomainError extends Error {
    public readonly code: ErrorCode;
    public readonly context?: Record<string, unknown>;
    public readonly timestamp: Date;

    constructor({ message, cause, context, code }: DomainErrorOptions = { code: ErrorCodes.INTERNAL_ERROR }) {
        super(message, { cause });

        this.name = this.constructor.name;
        this.code = code;
        this.cause = cause;
        this.context = context;
        this.timestamp = new Date();
        // Error.captureStackTrace(this, this.constructor);
    }

    toObject() {
        return {
            name: this.name,
            code: this.code,
            message: this.message,
            context: this.context,
            timestamp: this.timestamp,
        };
    }
}

export class ValidationError extends DomainError {
    constructor(message = 'Validation error', cause?: unknown, context?: Record<string, unknown>) {
        super({ code: ErrorCodes.VALIDATION_ERROR, message, cause, context });
    }
}
