import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { DomainError } from '@/domain/errors/domain-errors';
import { getExceptionTitle } from '@/domain/errors';
import { TypedConfigService } from '@/config/typed-config.service';
import { getHttpStatus, getErrorMetadata } from './error-mapper';
import { ErrorResponseDto } from './dtos/error-response';

/**
 * Global exception filter for domain errors
 * Maps domain errors to HTTP responses using infrastructure-specific mappings\
 *
 * Implements RFC 7807 problem details format (https://www.rfc-editor.org/rfc/rfc7807.html)
 */
@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(DomainExceptionFilter.name);

    constructor(private readonly config: TypedConfigService) {}

    catch(exception: DomainError, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const reply = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();

        const httpStatus = getHttpStatus(exception.code);
        const metadata = getErrorMetadata(exception.code);

        this.logError(exception, metadata.logLevel, request);

        let exceptionTitleError = getExceptionTitle(exception.code);
        if (!exceptionTitleError) {
            this.logger.warn(`No title found for error code ${exception.code}, using generic title`);
            exceptionTitleError = 'Application Error';
        }

        const errorResponse = new ErrorResponseDto({
            type: `urn:problem:${exception.code}`,
            title: exceptionTitleError,
            status: httpStatus,
            detail: exception.message,
            errorCode: exception.code,
            id: exception.timestamp.toISOString(),
            instance: request.url,
        });

        reply.status(httpStatus).send(errorResponse);
    }

    private logError(
        exception: DomainError,
        level: 'debug' | 'info' | 'warn' | 'error',
        request: FastifyRequest,
    ): void {
        const logData = {
            errorCode: exception.code,
            errorName: exception.name,
            message: exception.message,
            path: request.url,
            method: request.method,
            context: exception.context,
            timestamp: exception.timestamp,
        };

        switch (level) {
            case 'debug':
                this.logger.debug(logData);
                break;
            case 'info':
                this.logger.log(logData);
                break;
            case 'warn':
                this.logger.warn(logData);
                break;
            case 'error':
                this.logger.error(logData, exception.stack);
                break;
        }
    }
}
