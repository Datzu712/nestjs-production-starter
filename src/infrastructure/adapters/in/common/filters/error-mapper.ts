import { HttpStatus } from '@nestjs/common';
import { ErrorCode, ErrorCodes } from '@/domain/errors/error-codes';

/**
 * Infrastructure concern: Maps domain error codes to HTTP status codes
 * This file contains infrastructure-specific mappings
 */

/**
 * HTTP status mapping for domain error codes
 */
export const ERROR_HTTP_STATUS_MAP: Record<ErrorCode, HttpStatus> = {
    // User errors
    [ErrorCodes.USER_ALREADY_EXISTS]: HttpStatus.CONFLICT,
    [ErrorCodes.USER_NOT_FOUND]: HttpStatus.NOT_FOUND,
    [ErrorCodes.USER_EMAIL_ALREADY_IN_USE]: HttpStatus.CONFLICT,
    [ErrorCodes.USER_INVALID_EMAIL]: HttpStatus.BAD_REQUEST,
    [ErrorCodes.USER_INVALID_PASSWORD]: HttpStatus.BAD_REQUEST,

    // Tenant errors
    [ErrorCodes.TENANT_ALREADY_EXISTS]: HttpStatus.CONFLICT,
    [ErrorCodes.TENANT_NOT_FOUND]: HttpStatus.NOT_FOUND,

    // Membership errors
    [ErrorCodes.MEMBERSHIP_ALREADY_EXISTS]: HttpStatus.CONFLICT,
    [ErrorCodes.MEMBERSHIP_NOT_FOUND]: HttpStatus.NOT_FOUND,
    [ErrorCodes.MEMBERSHIP_INVALID_ROLE]: HttpStatus.BAD_REQUEST,
    [ErrorCodes.MEMBERSHIP_INSUFFICIENT_PERMISSIONS]: HttpStatus.FORBIDDEN,

    // General errors
    [ErrorCodes.VALIDATION_ERROR]: HttpStatus.BAD_REQUEST,
    [ErrorCodes.INTERNAL_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
};

/**
 * Metadata for error handling in infrastructure layer
 */
export interface ErrorMetadata {
    readonly retryable: boolean;
    readonly severity: 'low' | 'medium' | 'high' | 'critical';
    readonly logLevel: 'debug' | 'info' | 'warn' | 'error';
}

/**
 * Error metadata mapping for infrastructure stuff
 */
export const ERROR_METADATA_MAP: Record<ErrorCode, ErrorMetadata> = {
    // User errors
    [ErrorCodes.USER_ALREADY_EXISTS]: {
        retryable: false,
        severity: 'low',
        logLevel: 'info',
    },
    [ErrorCodes.USER_NOT_FOUND]: {
        retryable: false,
        severity: 'low',
        logLevel: 'info',
    },
    [ErrorCodes.USER_EMAIL_ALREADY_IN_USE]: {
        retryable: false,
        severity: 'low',
        logLevel: 'info',
    },
    [ErrorCodes.USER_INVALID_EMAIL]: {
        retryable: false,
        severity: 'low',
        logLevel: 'info',
    },
    [ErrorCodes.USER_INVALID_PASSWORD]: {
        retryable: false,
        severity: 'low',
        logLevel: 'info',
    },

    // Tenant errors
    [ErrorCodes.TENANT_ALREADY_EXISTS]: {
        retryable: false,
        severity: 'low',
        logLevel: 'info',
    },
    [ErrorCodes.TENANT_NOT_FOUND]: {
        retryable: false,
        severity: 'low',
        logLevel: 'info',
    },

    // Membership errors
    [ErrorCodes.MEMBERSHIP_ALREADY_EXISTS]: {
        retryable: false,
        severity: 'low',
        logLevel: 'info',
    },
    [ErrorCodes.MEMBERSHIP_NOT_FOUND]: {
        retryable: false,
        severity: 'low',
        logLevel: 'info',
    },
    [ErrorCodes.MEMBERSHIP_INVALID_ROLE]: {
        retryable: false,
        severity: 'low',
        logLevel: 'info',
    },
    [ErrorCodes.MEMBERSHIP_INSUFFICIENT_PERMISSIONS]: {
        retryable: false,
        severity: 'medium',
        logLevel: 'warn',
    },

    // General errors
    [ErrorCodes.VALIDATION_ERROR]: {
        retryable: false,
        severity: 'low',
        logLevel: 'info',
    },
    [ErrorCodes.INTERNAL_ERROR]: {
        retryable: true,
        severity: 'critical',
        logLevel: 'error',
    },
};

export function getHttpStatus(code: ErrorCode): HttpStatus {
    return ERROR_HTTP_STATUS_MAP[code] ?? HttpStatus.INTERNAL_SERVER_ERROR;
}

export function getErrorMetadata(code: ErrorCode): ErrorMetadata {
    return (
        ERROR_METADATA_MAP[code] ?? {
            retryable: false,
            severity: 'high',
            logLevel: 'error',
        }
    );
}
export function getErrorSeverity(code: ErrorCode): 'low' | 'medium' | 'high' | 'critical' {
    return getErrorMetadata(code).severity;
}

export function getLogLevel(code: ErrorCode): 'debug' | 'info' | 'warn' | 'error' {
    return getErrorMetadata(code).logLevel;
}
