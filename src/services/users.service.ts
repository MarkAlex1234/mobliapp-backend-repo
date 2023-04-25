import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private httpService: HttpService) {}

  getUser(userId: string) {
    throw new Error('Method not implemented.');
  }

  updateUserLocation(userId: string) {
    throw new Error('Method not implemented.');
  }

  getNearestBusesForUser(userId: string) {
    throw new Error('Method not implemented.');
  }

  endUserBusRide(userId: string) {
    throw new Error('Method not implemented.');
  }
  setUserBusRide(userId: string) {
    throw new Error('Method not implemented.');
  }
}
