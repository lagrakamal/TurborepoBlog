import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import serverlessExpress from '@vendia/serverless-express';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function createApp() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.init();
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
