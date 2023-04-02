import { Controller } from '@nestjs/common';
import { UsersService } from './users.services';

@Controller('users')
export class UsersContoller {
  constructor(private readonly usersService: UsersService) {}
}
