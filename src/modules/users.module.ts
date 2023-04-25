import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersContoller } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { BusModule } from './bus.module';

@Module({
  imports: [HttpModule, BusModule],
  controllers: [UsersContoller],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
