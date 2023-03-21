import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { VEHICLE_TYPE } from './common/constants/common';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Connected';
  }

  /**
   *
   * @param routeId
   * @returns
   */
  async getRouteById(routeId: string) {
    try {
      const response = await this.httpService
        .get(`https://api.at.govt.nz/gtfs/v3/routes/${routeId}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
          },
        })
        .toPromise();

      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   *
   * @param busId
   * @returns
   */
  async getBusDetailsFromFirebaseById(busId: string) {
    try {
      const snapshot = await admin.database().ref('/Bus/:busId').once('value');
      const data = snapshot.val();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   *
   * @param busId
   * @returns
   */
  async getAllActiveBusesByRouteShortName(routeShortName: string) {
    try {
      const response = this.httpService
        .get('https://api.at.govt.nz/v2/public/realtime/vehiclelocations', {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
          },
          params: {
            routeShortName: routeShortName,
            vehicleType: VEHICLE_TYPE,
          },
        })
        .toPromise();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   *
   * @param busId
   * @returns
   */
  async getAllStops(filterDate?: Date) {
    try {
      const response = this.httpService
        .get('https://api.at.govt.nz/gtfs/v3/stops', {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
          },
          params: {
            filterDate: filterDate ? filterDate : null,
          },
        })
        .toPromise();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
