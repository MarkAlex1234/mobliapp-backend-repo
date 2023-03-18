import { Controller, Get, Param, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { GetBusDetailsResponseInterface } from './common/interfaces/get-bus-details-response.interface';
import { GetBusLocationResponseInterface } from './common/interfaces/get-bus-location-response.interface';
import { PatchBusLocationResponseInterface } from './common/interfaces/patch-bus-location-response.interface';
import * as admin from 'firebase-admin';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private httpService: HttpService,
  ) {}

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
    const snapshot = await admin.database().ref('/Bus/:busId').once('value');
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

  /**
   *
   */
  @Get('route/:routeId')
  async getBusOnTripByID(
    @Param('routeId') routeId: string,
  ): Promise<GetBusLocationResponseInterface> {
    try {
      const response = await this.httpService
        .get(`https://api.at.govt.nz/gtfs/v3/routes/${routeId}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
          },
        })
        .toPromise();

      console.log(response.data); // handle the response data here
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
