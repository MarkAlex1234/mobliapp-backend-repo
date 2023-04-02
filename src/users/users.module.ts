import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersContoller } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [HttpModule],
  controllers: [UsersContoller],
  providers: [UsersService],
})
export class UsersModule {}
