import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { DomainError } from '@/domain/errors/domain-errors';
import type { FastifyReply } from 'fastify';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: DomainError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const reply = ctx.getResponse<FastifyReply>();

        const statusCode = this.mapDomainErrorToHttpStatus(exception);

        reply.status(statusCode).send({
            statusCode,
            message: exception.message,
            error: exception.name,
            timestamp: new Date().toISOString(),
        });
    }

    private mapDomainErrorToHttpStatus(error: DomainError): number {
        const errorName = error.constructor.name;

        const statusMap: Record<string, number> = {
            UserNotFoundError: HttpStatus.NOT_FOUND,
            UserAlreadyExistsError: HttpStatus.CONFLICT,
            InvalidCredentialsError: HttpStatus.UNAUTHORIZED,
            ValidationError: HttpStatus.BAD_REQUEST,
        };

        return statusMap[errorName] ?? HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
