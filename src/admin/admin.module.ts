import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AdminContoller } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [HttpModule],
  controllers: [AdminContoller],
  providers: [AdminService],
})
export class AdminModule {}
