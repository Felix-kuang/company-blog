import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://192.168.18.4:3001'],
    credentials: true,
  });
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
