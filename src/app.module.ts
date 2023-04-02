import { Module } from '@nestjs/common';
import { BusModule } from './bus/bus.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [BusModule, UsersModule, AdminModule],
})
export class AppModule {}
