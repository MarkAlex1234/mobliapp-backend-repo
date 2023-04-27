import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserInterface } from 'src/common/interfaces/user.interface';

@Controller('users')
export class UsersContoller {
  constructor(private readonly usersService: UsersService) {}
  /**
   * Endpoint to get a user
   */
  @Get('user/:userId')
  getUser(@Param('userId') userId: string) {
    return this.usersService.getUser(userId);
  }

  /**
   * Endpoint to get the nearest five buses to a user
   */
  @Get('user/:userId/nearest-buses')
  getNearestBusesForUser(@Param('userId') userId: string) {
    return this.usersService.getNearestBusesForUser(userId);
  }

  /**
   * Endpoint to update a users location
   */
  @Patch('user/:userId/location')
  updateUserLocation(@Param('userId') userId: string) {
    return this.usersService.updateUserLocation(userId);
  }

  /**
   * Endpoint for users to confirm the bus they are on
   */
  @Post('user/:userId/confirm/:busId')
  setUserBusRide(
    @Param('userId') userId: string,
    @Param('busId') busId: string,
  ) {
    return this.usersService.setUserBusRide(userId, busId);
  }

  /**
   * Endpoint to create a user
   */
  @Post('/create')
  addUser(@Body() user: UserInterface) {
    return this.usersService.addUser(user);
  }

  /**
   * Endpoint to end a users ride
   */
  @Put('user/:userId/end-ride')
  endUserBusRide(@Param('userId') userId: string) {
    return this.usersService.endUserBusRide(userId);
  }
}
