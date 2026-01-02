import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Logger, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { TypedConfigService } from './config/typed-config.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new FastifyAdapter());

    const configService = app.get(TypedConfigService);

    app.enableVersioning({
        type: VersioningType.URI,
        prefix: 'v',
    });

    if (configService.get('NODE_ENV') !== 'production') {
        const config = new DocumentBuilder()
            .setTitle('REST API template')
            .setDescription('Api documentation')
            .setVersion('1.0')
            .addTag('api')
            .build();

        const documentFactory = () => SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, documentFactory, {
            jsonDocumentUrl: '/api-json',
        });
    }

    await app.listen(configService.get('HTTP_PORT', 3000));
    Logger.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
