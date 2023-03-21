import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * Endpoint to get bus details by bus ID
   * @returns
   */
  @Get('bus/:busId/details')
  async getBusDetails(@Param('busId') busId: string) {
    return this.appService.getBusDetailsFromFirebaseById(busId);
  }

  /**
   *
   * @returns
   */
  @Get('bus/:busId/location')
  getBusLocation() {
    return this.appService.getHello();
  }

  /**
   *
   * @returns
   */
  @Patch('bus/:busId/update-location')
  updateBusLocation() {
    return this.appService.getHello();
  }

  /**
   * Endpoint to get route details by route ID
   */
  @Get('route/:routeId')
  async getBusOnTripByID(@Param('routeId') routeId: string) {
    return this.appService.getRouteById(routeId);
  }

  /**
   * Endpoint to get active buses on a route by route short name
   * @returns
   */
  @Get('route/:routeShortName/active')
  getAllActiveBusesByRouteShortName(
    @Param('routeShortName') routeShortName: string,
  ) {
    return this.appService.getAllActiveBusesByRouteShortName(routeShortName);
  }

  /**
   * Endpoint to get all stops
   * @returns
   */
  @Get('all/stops')
  getAllStops(@Query('filterDate') filterDate?: Date) {
    if (filterDate) {
      return this.appService.getAllStops(filterDate);
    }
    return this.appService.getAllStops();
  }
}
