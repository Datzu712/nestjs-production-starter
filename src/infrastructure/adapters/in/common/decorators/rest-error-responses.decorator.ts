import { ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { ErrorCodes, getExceptionTitle, type ErrorCode } from '@/domain/errors';
import { getHttpStatus } from '../filters/error-mapper';
import { ErrorResponseDto, type ProblemDetails } from '../filters/dtos/error-response';

// You may need to use a better way to document error responses in Swagger
// this is just a simple approach with RFC 7807
export function ApiErrorResponses(...errorCodes: ErrorCode[]) {
    const decorators = [...errorCodes, ErrorCodes.INTERNAL_ERROR].map((code) => {
        const status = getHttpStatus(code);
        const title = getExceptionTitle(code);

        return ApiResponse({
            status,
            description: title,
            type: ErrorResponseDto,
            example: {
                type: `urn:problem:${code}`, // urn = Uniform Resource Name
                title,
                status,
                detail: `Example error for ${code}`,
                errorCode: code,
                id: randomUUID(),
                instance: `/rest/v1/some-endpoint`,
            } as ProblemDetails,
        });
    });

    return applyDecorators(...decorators);
}
