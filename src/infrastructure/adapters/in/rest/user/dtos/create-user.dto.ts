import type { CreateUserAttributes } from '@/domain/models/user';
import { IsString, IsEmail, IsBoolean, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements CreateUserAttributes {
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
    })
    @IsEmail()
    email!: string;

    @ApiProperty({
        description: 'Username for the user',
        example: 'johndoe',
        minLength: 3,
    })
    @IsString()
    @MinLength(3)
    username!: string;

    @ApiProperty({
        description: 'Indicates if the user account is active',
        example: true,
    })
    @IsBoolean()
    isActive!: boolean;

    @ApiProperty({
        description: 'Password for the user',
        example: '$2b$10$...',
    })
    @IsString()
    @MinLength(8)
    password!: string;
}
