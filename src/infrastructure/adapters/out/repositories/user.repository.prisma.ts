import { Injectable } from '@nestjs/common';

import { genSalt, hash } from 'bcrypt';
import type { CreateUserAttributes, User } from '@/domain/models/user';
import { UserNotFoundError } from '@/domain/errors/user.errors';
import type { UserRepository } from '@/application/ports/out/user.repository';
import { PrismaService } from '../db/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(userData: CreateUserAttributes): Promise<User> {
        const salt = await genSalt(10);
        const hashedPassword = await hash(userData.password, salt);

        const user = await this.prisma.user.create({
            data: {
                email: userData.email,
                username: userData.username,
                hashed_password: hashedPassword,
                is_active: userData.isActive,
            },
        });

        return this.toDomain(user);
    }

    async delete(userId: string): Promise<void> {
        const targetUser = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!targetUser) {
            throw new UserNotFoundError();
        }

        await this.prisma.user.delete({
            where: { id: userId },
        });
    }

    async find(options: Partial<User>): Promise<User | null> {
        const targetUser = await this.prisma.user.findFirst({
            where: {
                ...options,
            },
        });

        if (!targetUser) {
            return null;
        }

        return this.toDomain(targetUser);
    }

    public toDomain(prismaUser: Prisma.userGetPayload<object>): User {
        return {
            id: prismaUser.id,
            email: prismaUser.email,
            username: prismaUser.username,
            isActive: prismaUser.is_active,
        };
    }
}
