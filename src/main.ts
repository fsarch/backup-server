import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { VersioningType, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { PinoLogger } from "./utils/logger/pino-logger.service.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: PinoLogger.Instance,
  });
  app.enableCors();

  // Global validation pipe to validate DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false,
    transform: true,
  }));

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Backup-Server')
    .setDescription('A server for managing/executing backups centrally')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
