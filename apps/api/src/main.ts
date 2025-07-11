import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import serverlessExpress from '@vendia/serverless-express';

async function createApp() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS for frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  return app;
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  createApp().then(app => app.listen(process.env.PORT || 8000));
}

// For Vercel serverless
export const handler = async (req: any, res: any) => {
  const app = await createApp();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp })(req, res);
};
