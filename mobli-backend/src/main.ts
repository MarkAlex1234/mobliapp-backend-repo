import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';

const server = express();
const adapter = new ExpressAdapter(server);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
}

bootstrap();
export const api = functions.https.onRequest(server);
