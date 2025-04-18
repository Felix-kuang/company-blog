import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({
    origin: ['http://192.168.18.4:3001', 'http://localhost:3001'],
    credentials: true,
  });
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
