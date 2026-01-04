import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, IsUrl, validateSync, ValidatorOptions } from 'class-validator';
import { IEnvironmentVariables } from './env';

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

class EnvironmentVariables implements IEnvironmentVariables {
    @IsOptional()
    @IsNumber()
    HTTP_PORT?: number;

    @IsUrl({ require_tld: false })
    API_DOCS_URL!: string;

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
