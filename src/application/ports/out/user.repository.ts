import type { User, CreateUserAttributes } from '@/domain/models/user';

export interface UserRepository {
    create(userData: CreateUserAttributes): Promise<User>;
    delete(userId: string): Promise<void>;
    find(options: Partial<User>): Promise<User | null>;
}
