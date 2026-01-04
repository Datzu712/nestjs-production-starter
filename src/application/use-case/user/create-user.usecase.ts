import type { CreateUserPort } from '@/application/ports/in/user/create-user';
import type { UserRepository } from '@/application/ports/out/user.repository';

import type { CreateUserAttributes, User } from '@/domain/models/user';
import { EmailAlreadyInUseError, UserCreationError } from '@/domain/errors';
import { validateCreateUser } from '@/domain/validators/user.validator';

export class CreateUserUseCase implements CreateUserPort {
    constructor(private readonly userRepo: UserRepository) {}

    /**
     * Creates a new user in the system.
     *
     * @throws {EmailAlreadyInUseError} When the provided email is already registered in the system
     * @throws {UserCreationError} When an unexpected error occurs during user creation
     */
    async execute(userData: CreateUserAttributes): Promise<User> {
        validateCreateUser(userData);

        try {
            const emailAlreadyInUse = await this.userRepo.find({ email: userData.email });
            if (emailAlreadyInUse) {
                throw new EmailAlreadyInUseError(userData.email);
            }

            return await this.userRepo.create(userData);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) throw error;

            throw new UserCreationError(error);
        }
    }
}
