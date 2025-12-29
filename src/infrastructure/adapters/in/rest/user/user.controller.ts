import { CreateUserUseCase } from '@/application/use-case/user/create-user.usecase';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller({
    version: '1',
    path: 'users',
})
export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}

    @Post()
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
