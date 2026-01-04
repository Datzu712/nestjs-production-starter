import { ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

import { ErrorCodes, getExceptionTitle, type ErrorCode } from '@/domain/errors';
import { getHttpStatus } from '../filters/error-mapper';
import { ErrorResponseDto, type ProblemDetails } from '../filters/dtos/error-response';

export function ApiErrorResponses(...errorCodes: ErrorCode[]) {
    const decorators = [...errorCodes, ErrorCodes.INTERNAL_ERROR].map((code) => {
        const status = getHttpStatus(code);
        const title = getExceptionTitle(code);

        return ApiResponse({
            status,
            description: title,
            type: ErrorResponseDto,
            example: {
                type: `${process.env.API_DOCS_URL}#/components/schemas/${code}`,
                title,
                status,
                detail: `Example error for ${code}`,
                errorCode: code,
                id: new Date().toISOString(),
            } as ProblemDetails,
        });
    });

    return applyDecorators(...decorators);
}
