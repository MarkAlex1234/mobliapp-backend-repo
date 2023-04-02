import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersContoller } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';

@Module({
  imports: [HttpModule],
  controllers: [UsersContoller],
  providers: [UsersService],
})
export class UsersModule {}
