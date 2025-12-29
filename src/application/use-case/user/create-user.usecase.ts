import type { CreateUserPort } from '@/application/ports/in/user/create-user';
import type { UserRepository } from '@/application/ports/out/user.repository';

import type { CreateUserAttributes, User } from '@/domain/models/user';
import { EmailAlreadyInUseError, UserCreationError } from '@/domain/errors/user.errors';
import { validateCreateUser } from '@/domain/validators/user.validator';

export class CreateUserUseCase implements CreateUserPort {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(userData: CreateUserAttributes): Promise<User> {
        validateCreateUser(userData);

        try {
            const emailAlreadyInUse = await this.userRepo.find({ email: userData.email });
            if (emailAlreadyInUse) {
                throw new EmailAlreadyInUseError();
            }

            return await this.userRepo.create(userData);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) throw error;

            throw new UserCreationError(error);
        }
    }
}
