import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AdminContoller } from '../controllers/admin.controller';
import { AdminService } from '../services/admin.service';

@Module({
  imports: [HttpModule],
  controllers: [AdminContoller],
  providers: [AdminService],
})
export class AdminModule {}
