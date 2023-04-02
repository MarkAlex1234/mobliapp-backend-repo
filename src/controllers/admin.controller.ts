import { Controller } from '@nestjs/common';
import { AdminService } from '../services/admin.service';

@Controller('admin')
export class AdminContoller {
  constructor(private readonly adminService: AdminService) {}
}
