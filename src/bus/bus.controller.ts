import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { BusService } from './bus.service';

@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Get()
  connected(): string {
    return this.busService.connected();
  }

  /**
   * Endpoint to get bus details by bus ID
   * @returns
   */
  @Get('details/:busId')
  async getBusDetails(@Param('busId') busId: string) {
    return this.busService.getBusDetailsFromFirebaseById(busId);
  }

  /**
   * Endpoint to get a bus location
   * @returns
   */
  @Get('location/:busId')
  getBusLocation() {
    return this.busService.connected();
  }

  /**
   * Endpoint to update a bus' location in the database
   * @returns
   */
  @Patch('update-location/:busId')
  updateBusLocation() {
    return this.busService.connected();
  }

  /**
   * Endpoint to get route details by route ID
   */
  @Get('route/:routeId')
  async getBusOnTripByID(@Param('routeId') routeId: string) {
    return this.busService.getRouteById(routeId);
  }

  /**
   * Endpoint to get active buses on a route by route ID
   * @returns
   */
  @Get('active-buses/route/:routeId')
  getAllActiveBusesByRouteId(@Param('routeId') routeId: string) {
    return this.busService.getAllActiveBusesByRouteId(routeId);
  }

  /**
   * Endpoint to get all stops
   * @returns
   */
  @Get('stops/all')
  getAllStops() {
    return this.busService.getAllStops();
  }

  /**
   * Endpoint to get a stop by ID
   * @returns
   */
  @Get('stops/:stopId')
  getStopById(@Param('stopId') stopId: string) {
    return this.busService.getStopById(stopId);
  }

  /**
   * Endpoint to get all active buses
   * @returns
   */
  @Get('active/all')
  getAllActiveBuses() {
    return this.busService.getAllActiveBuses();
  }

  /**
   * Endpoint to get active bus by ID
   * @returns
   */
  @Get('active/:busId')
  getActiveBusLocationById(@Param('busId') busId: string) {
    return this.busService.getActiveBusLocationById(busId);
  }

  /**
   * Endpoint to get trip updates by ID
   * @returns
   */
  @Get('trip/:tripId')
  getTripUpdatesById(@Param('tripId') tripId: string) {
    return this.busService.getTripUpdatesById(tripId);
  }
}
