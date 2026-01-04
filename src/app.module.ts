import { Module } from '@nestjs/common';

import { DatabaseModule } from './infrastructure/adapters/out/db/database.module';
import { RestModule } from './infrastructure/adapters/in/rest/rest.module';
import { ConfigModule } from './config/config.module';
import { APP_FILTER } from '@nestjs/core';
import { DomainExceptionFilter } from './infrastructure/adapters/in/common/filters/domain-exception.filter';

@Module({
    imports: [DatabaseModule, RestModule, ConfigModule],
    providers: [
        {
            provide: APP_FILTER,
            useClass: DomainExceptionFilter,
        },
    ],
})
export class AppModule {}
