import { Module } from '@nestjs/common';

import { DI_TOKENS } from '@/shared/constants/di-tokens';
import { CreateUserUseCase } from '@/application/use-case/user/create-user.usecase';
import { PrismaUserRepository } from '@/infrastructure/adapters/out/repositories/user.repository.prisma';
import { UserController } from './user.controller';
import { DatabaseModule } from '@/infrastructure/adapters/out/db/database.module';
import { UserRepository } from '@/application/ports/out/user.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        {
            provide: DI_TOKENS.USER_REPOSITORY,
            useClass: PrismaUserRepository,
        },
        {
            provide: DI_TOKENS.CREATE_USER_USE_CASE,
            useFactory: (userRepository: UserRepository) => new CreateUserUseCase(userRepository),
            inject: [DI_TOKENS.USER_REPOSITORY],
        },
    ],
    exports: [DI_TOKENS.USER_REPOSITORY, DI_TOKENS.CREATE_USER_USE_CASE],
})
export class UserModule {}
