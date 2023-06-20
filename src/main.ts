import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();

  //NEST APP INIT
  const app = await NestFactory.create(AppModule);

  //UNCOMMENT WHEN RUNNING LOCAL FRONTEND PROJECT:
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
