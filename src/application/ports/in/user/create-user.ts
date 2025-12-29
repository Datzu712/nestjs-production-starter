import type { CreateUserAttributes, User } from '@/domain/models/user';

export interface CreateUserPort {
    execute(userData: CreateUserAttributes): Promise<User>;
}
