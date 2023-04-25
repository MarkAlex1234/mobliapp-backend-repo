import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/common/interfaces/user.interface';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  constructor(private httpService: HttpService) {}

  /*
   * Get a user from firebase by ID
   * @param userId
   * @returns
   */
  async getUser(userId: string): Promise<UserInterface> {
    return this.getUserFromFirebase(userId);
  }

  getNearestBusesForUser(userId: string): Promise<UserInterface> {
    throw new Error('Method not implemented.');
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
