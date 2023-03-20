import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
const serviceAccount = require('./../firebase.json');
const firebaseConfig = require('./../firebaseConfig.json');
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { Logger } from '@nestjs/common/services';
import { initial } from './readandwrite';


const firebaseApp = initializeApp(firebaseConfig);
export const adminDatabase = getDatabase(firebaseApp);
async function bootstrap() {
  dotenv.config();
  //checking if the database is working.
  if(adminDatabase){
    Logger.log("admin database is initialized");
  }else{
   Logger.error("database not connected/initilized");
  }
  //FIREBASE INIT
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  initial();
  //NEST APP INIT
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();