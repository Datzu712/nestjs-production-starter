import { ApiProperty } from '@nestjs/swagger';

/**
 * Error response structure following RFC 7807 (Problem Details for HTTP APIs)
 * https://www.rfc-editor.org/rfc/rfc7807.html
 */
export interface ProblemDetails {
    /**
     * "type" (string) - A URI reference [RFC3986] that identifies the
     * problem type.
     */
    type: string;
    /*
     * A short, human-readable summary of the problem
     * type.
     */
    title: string;

    /**
     * The HTTP status code ([RFC7231], Section 6)
     */
    status: number;

    /**
     * A human-readable explanation specific to this occurrence of the
     * problem.
     */
    detail: string;

    /**
     * code - application-specific error code (used for i18n or further)
     */
    errorCode: string;

    /**
     * id - A unique identifier for this specific occurrence of the problem.
     */
    id: string;

    invalidParams?: {
        name: string;
        reason: string;
    }[];
}

export class ErrorResponseDto implements ProblemDetails {
    @ApiProperty({
        description: 'A URI reference that identifies the problem type',
        example: 'https://api.example.com/errors/not-found',
    })
    type!: string;

    @ApiProperty({
        description: 'A short, human-readable summary of the problem type',
        example: 'Resource Not Found',
    })
    title!: string;

    @ApiProperty({
        description: 'The HTTP status code',
        example: 404,
    })
    status!: number;

    @ApiProperty({
        description: 'A human-readable explanation specific to this occurrence of the problem',
        example: 'The requested user with ID 123 was not found',
    })
    detail!: string;

    @ApiProperty({
        description: 'Application-specific error code',
        example: 'USER_1000',
    })
    errorCode!: string;

    @ApiProperty({
        description: 'A unique identifier for this specific occurrence of the problem',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    id!: string;

    constructor(partial: ErrorResponseDto) {
        Object.assign(this, partial);
    }
}
