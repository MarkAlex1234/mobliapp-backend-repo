import { Controller } from '@nestjs/common';
import { UsersService } from './users.services';

@Controller()
export class UsersContoller {
  constructor(private readonly usersService: UsersService) {}
}
