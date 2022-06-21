import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminJwtGuard } from 'src/modules/jwt/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  login(@Body() body: AdminLoginDto) {
    return this.adminService.login(body);
  }

  @Post('add')
  add(@Body() body: AdminLoginDto) {
    return this.adminService.add(body);
  }

  @UseGuards(AdminJwtGuard)
  @Post('delete')
  delete(@Body() body: AdminLoginDto) {
    return this.adminService.delete(body);
  }
}
