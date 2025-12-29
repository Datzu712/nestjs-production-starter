import { Module } from '@nestjs/common';

import { DatabaseModule } from './infrastructure/adapters/out/db/database.module';
import { RestModule } from './infrastructure/adapters/in/rest/rest.module';
import { ConfigModule } from './config/config.module';

@Module({
    imports: [DatabaseModule, RestModule, ConfigModule],
})
export class AppModule {}
