import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS (for frontend/backend communication)
  app.enableCors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:3000'], // Frontend URL(s)
    credentials: true, // Allow cookies
  });

  // Use middlewares
  app.use(cookieParser());

  // Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Global prefix (optional, but good for versioning)
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
