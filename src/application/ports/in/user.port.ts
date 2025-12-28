import type { CreateUserAttributes, User } from '@/domain/models/user';

export interface UserPort {
    createUser(userData: CreateUserAttributes): Promise<User>;
}
