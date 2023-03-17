import { Controller, Get, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { GetBusDetailsResponseInterface } from './common/interfaces/get-bus-details-response.interface';
import { GetBusLocationResponseInterface } from './common/interfaces/get-bus-location-response.interface';
import { PatchBusLocationResponseInterface } from './common/interfaces/patch-bus-location-response.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   *
   * @returns
   */
  @Get(':busId/details')
  getBusDetails(): GetBusDetailsResponseInterface {
    return this.appService.getHello();
  }

  /**
   *
   * @returns
   */
  @Get(':busId/location')
  getBusLocation(): GetBusLocationResponseInterface {
    return this.appService.getHello();
  }

  /**
   *
   * @returns
   */
  @Patch(':busId/location')
  updateBusLocation(): PatchBusLocationResponseInterface {
    return this.appService.getHello();
  }
}
