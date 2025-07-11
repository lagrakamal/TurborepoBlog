import { createServer } from 'vercel-node-server';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { IncomingMessage, ServerResponse } from 'http';
const express = require('express');

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  await app.init();
  return createServer(expressApp);
}

const serverPromise = bootstrap();

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const server = await serverPromise;
  server.emit('request', req, res);
}
