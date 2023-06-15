import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminJwtGuard } from 'src/modules/jwt/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('')
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiBody({ type: AdminLoginDto })
  add(@Body() body: AdminLoginDto) {
    return this.adminService.add(body);
  }

  @Post('/auth/login')
  @ApiOperation({ summary: 'Login as an admin' })
  @ApiBody({ type: AdminLoginDto })
  login(@Body() body: AdminLoginDto) {
    return this.adminService.login(body);
  }

  @UseGuards(AdminJwtGuard)
  @Delete('/{adminId}')
  @ApiOperation({ summary: 'Delete a specific admin using his ID' })
  @ApiParam({ name: 'id', description: 'The ID of the admin' })
  delete(@Param() adminId: string) {
    return this.adminService.delete(adminId);
  }
}
