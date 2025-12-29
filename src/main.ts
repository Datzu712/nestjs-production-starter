import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { TypedConfigService } from './config/typed-config.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new FastifyAdapter());

    const configService = app.get(TypedConfigService);

    await app.listen(configService.get('HTTP_PORT', 3000));
    console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
