import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { IEnvironmentVariables } from './env';

@Injectable()
export class TypedConfigService {
    constructor(private configService: ConfigService<IEnvironmentVariables, true>) {}

    get<K extends keyof IEnvironmentVariables>(key: K): IEnvironmentVariables[K] {
        return this.configService.get(key, { infer: true })!;
    }

    getOrThrow<K extends keyof IEnvironmentVariables>(key: K): NonNullable<IEnvironmentVariables[K]> {
        return this.configService.getOrThrow(key, { infer: true });
    }
}
