import { Controller, Get, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { GetBusDetailsResponseInterface } from './common/interfaces/get-bus-details-response.interface';
import { GetBusLocationResponseInterface } from './common/interfaces/get-bus-location-response.interface';
import { PatchBusLocationResponseInterface } from './common/interfaces/patch-bus-location-response.interface';
import * as admin from 'firebase-admin';

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
  //Promise<GetBusDetailsResponseInterface>
  async getBusDetails() {
    const snapshot = await admin.database().ref('/data').once('value');
    const data = snapshot.val();
    return data;
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
