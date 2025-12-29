import { plainToInstance } from 'class-transformer';
import { IsEnum, IsString, validateSync, ValidatorOptions } from 'class-validator';
import { IEnvironmentVariables } from './env';

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

class EnvironmentVariables implements IEnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV!: 'development' | 'production' | 'test';

    @IsString()
    USER_IN_MEMORY_DB?: 'true' | 'false';

    @IsString()
    DATABASE_URL!: string;
}

export function validateEnv(config: Record<string, unknown>) {
    const group = process.env.NODE_ENV === 'test' ? 'test' : 'required';

    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
        groups: [group],
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
        whitelist: true,
        groups: [group],
    } as ValidatorOptions);

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return validatedConfig;
}
