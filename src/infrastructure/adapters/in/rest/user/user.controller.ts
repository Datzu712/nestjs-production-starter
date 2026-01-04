import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import type { CreateUserUseCase } from '@/application/use-case/user/create-user.usecase';
import { DI_TOKENS } from '@/shared/constants/di-tokens';

import { CreateUserDto } from './dtos/create-user.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../../common/decorators/rest-error-responses.decorator';
import { ErrorCodes } from '@/domain/errors';

@Controller({
    version: '1',
    path: 'users',
})
export class UserController {
    constructor(@Inject(DI_TOKENS.CREATE_USER_USE_CASE) private readonly createUserUseCase: CreateUserUseCase) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiErrorResponses(ErrorCodes.USER_EMAIL_ALREADY_IN_USE)
    async createUser(
        @Body(
            new ValidationPipe({
                transform: true,
                forbidNonWhitelisted: true,
                whitelist: true,
            }),
        )
        createUserDto: CreateUserDto,
    ) {
        return this.createUserUseCase.execute(createUserDto);
    }
}
