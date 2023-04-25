import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/common/interfaces/user.interface';
import * as admin from 'firebase-admin';
import { BusService } from './bus.service';
import * as geolib from 'geolib';

@Injectable()
export class UsersService {
  constructor(private busService: BusService) {}

  /*
   * Get a user from firebase by ID
   * @param userId
   * @returns
   */
  async getUser(userId: string): Promise<UserInterface> {
    return this.getUserFromFirebase(userId);
  }

  /**
   * Create a user
   * @param user
   * @returns
   */
  async addUser(user: UserInterface): Promise<UserInterface> {
    const userExisits = await this.getUserFromFirebase(user.userId);

    if (!userExisits) {
      await this.writeUserData(user);
      return this.getUser(user.userId);
    } else {
      console.error('ERROR - user already exisits with that ID', user);
    }
  }

  /**
   * Gets the 5 nearest buses for a user
   * @param userId
   */
  async getNearestBusesForUser(userId: string): Promise<BusDataInterface[]> {
    const [user, busData] = await Promise.all([
      this.getUserFromFirebase(userId),
      this.busService.getAllActiveBuses(),
    ]);

    const mappedBusData: BusDataInterface[] = busData.map((item: any) => ({
      id: item.id,
      label: item.vehicle.vehicle.label,
      license_plate: item.vehicle.vehicle.license_plate,
      latitude: item.vehicle.position.latitude,
      longitude: item.vehicle.position.longitude,
      speed: item.vehicle.position.speed,
      timestamp: item.vehicle.timestamp,
      is_deleted: item.is_deleted,
    }));

    const referencePoint = {
      latitude: user.userLocation[0],
      longitude: user.userLocation[1],
    };

    const nearestBuses: BusDataInterface[] = [...mappedBusData]
      .sort(
        (a, b) =>
          geolib.getDistance(referencePoint, {
            latitude: a.latitude,
            longitude: a.longitude,
          }) -
          geolib.getDistance(referencePoint, {
            latitude: b.latitude,
            longitude: b.longitude,
          }),
      )
      .slice(0, 5);

    return nearestBuses;
  }

  async endUserBusRide(userId: string): Promise<UserInterface> {
    const user = await this.getUserFromFirebase(userId);

    // Write the updated data to firebase - Can be async logs errors and successes
    this.writeUserData(user);

    return user;
  }

  async setUserBusRide(userId: string): Promise<UserInterface> {
    const user = await this.getUserFromFirebase(userId);

    // Write the updated data to firebase - Can be async logs errors and successes
    this.writeUserData(user);

    return user;
  }

  async updateUserLocation(userId: string): Promise<UserInterface> {
    const user = await this.getUserFromFirebase(userId);

    // Write the updated data to firebase - Can be async logs errors and successes
    this.writeUserData(user);

    return user;
  }

  /**
   * Writes to the database to update a users details
   * @param userId: string
   * @param user: UserInterface
   * **/
  async writeUserData(user: UserInterface): Promise<void> {
    admin
      .database()
      .ref('users/' + user.userId)
      .set(user)
      .then(() => {
        console.log('Data written successfully. ', user);
      })
      .catch((error) => {
        console.error('Error writing data:', error);
      });
  }

  /**
   * Reads from the database to get a users details
   * @param userId: string
   *
   * **/
  async getUserFromFirebase(userId: string): Promise<UserInterface> {
    const userRef = admin.database().ref('users/' + userId);
    let user: UserInterface;

    userRef
      .once('value', (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          user = {
            userId: userData?.userId ?? null,
            userLocation: userData?.userLocation ?? null,
            userRideBusId: userData?.userRideBusId ?? null,
            busRideEnded: userData?.busRideEnded ?? null,
          };
          console.log('User data retrieved:', user);
        } else {
          console.log('No data available for user ID:', userId);
        }
      })
      .catch((error) => {
        console.error('Error reading data:', error);
      });

    if (user) {
      return user;
    } else {
      console.error('Error getting user: ', userId);
    }
  }
}
