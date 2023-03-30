import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BusController } from './bus.controller';
import { BusService } from './bus.service';

@Module({
  imports: [HttpModule],
  controllers: [BusController],
  providers: [BusService],
})
export class BusModule {}
