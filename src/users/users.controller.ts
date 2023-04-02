import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersContoller {
  constructor(private readonly usersService: UsersService) {}
}
