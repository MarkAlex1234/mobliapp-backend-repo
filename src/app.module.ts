import { Module } from '@nestjs/common';
import { BusModule } from './bus/bus.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BusModule, UsersModule],
})
export class AppModule {}
