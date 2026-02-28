import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Initializing the app for Vercel
  await app.init();
  return app.getHttpServer();
}

// For Vercel serverless deployment
if (process.env.VERCEL) {
  module.exports = bootstrap();
} else {
  // For local development
  bootstrap().then(async (server) => {
    const port = process.env.PORT ?? 3000;
    await server.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
  });
}
