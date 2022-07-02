import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { ShiftService } from '../shift/shift.service';
import { CreateDoctorUserDto } from './dto/create-doctor-user.dto';
import { CreateShiftDto } from '../shift/dto/create-shift.dto';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { DoctorLoginDto } from './dto/doctor-login.dto';
import { AdminJwtGuard, DoctorJwtGuard } from 'src/modules/jwt/jwt.guard';

@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly shiftService: ShiftService,
  ) {}

  @Get('all')
  async getAll() {
    return this.doctorService.getAll();
  }

  @UseGuards(AdminJwtGuard)
  @Get('users/all')
  async getAllUsers() {
    return this.doctorService.getAllUsers();
  }

  @UseGuards(DoctorJwtGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.doctorService.getOneByID(id);
  }

  @UseGuards(AdminJwtGuard)
  @Post('create/user')
  async createUser(@Body() body: CreateDoctorUserDto) {
    return this.doctorService.createUser(body);
  }

  @UseGuards(AdminJwtGuard)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.doctorService.delete(id);
  }

  @Post('login')
  async login(@Body() body: DoctorLoginDto) {
    return this.doctorService.login(body);
  }

  @Post('create/profile')
  async createProfile(@Body() body: CreateDoctorProfileDto) {
    return await this.doctorService.createProfile(body);
  }

  @UseGuards(DoctorJwtGuard)
  @Post('shift/set')
  async setShift(@Body() body: CreateShiftDto) {
    return this.shiftService.create(body);
  }
}
