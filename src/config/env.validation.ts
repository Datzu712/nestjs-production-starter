import { plainToInstance } from 'class-transformer';
import { IsEnum, IsOptional, IsString, validateSync, ValidatorOptions } from 'class-validator';
import { IEnvironmentVariables } from './env';

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

class EnvironmentVariables implements IEnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV!: 'development' | 'production' | 'test';

    @IsOptional()
    @IsString()
    USER_IN_MEMORY_DB?: 'true' | 'false';

    @IsString()
    DATABASE_URL!: string;
}

export function validateEnv(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
        whitelist: true,
    } as ValidatorOptions);

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return validatedConfig;
}
