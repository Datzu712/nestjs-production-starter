export interface User {
    id: string;
    email: string;
    username: string;
    hashedPassword: string;
    isActive: boolean;
}

export type CreateUserAttributes = Pick<User, 'email' | 'username' | 'isActive' | 'hashedPassword'>;
