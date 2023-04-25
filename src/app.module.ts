import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BusModule } from './modules/bus.module';
import { UsersModule } from './modules/users.module';
import { AdminModule } from './modules/admin.module';
import { PreauthMiddleware } from './common/auth/preauth.middleware';

@Module({
  imports: [BusModule, UsersModule, AdminModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreauthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
