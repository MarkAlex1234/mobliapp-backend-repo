import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BusController } from '../controllers/bus.controller';
import { BusService } from '../services/bus.service';

@Module({
  imports: [HttpModule],
  controllers: [BusController],
  providers: [BusService],
})
export class BusModule {}
