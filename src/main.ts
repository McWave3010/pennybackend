import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unknown properties from DTOs
      transform: true, // Automatically transform payloads to DTO classes
    }),
  );
  app.enableCors({
    origin: ['http://localhost:8080', 'http://localhost:3001'], // Allow all origins (Use specific origins in production)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Allow sending cookies with requests
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
