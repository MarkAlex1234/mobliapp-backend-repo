import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
const serviceAccount = require('./../firebase.json');

async function bootstrap() {
  dotenv.config();

  //FIREBASE INIT
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  //NEST APP INIT
  const app = await NestFactory.create(AppModule);

  //UNCOMMENT WHEN RUNNING LOCAL FRONTEND PROJECT:
  //app.enableCors();

  await app.listen(process.env.PORT);
}
bootstrap();
