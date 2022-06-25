import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { ShiftService } from '../shift/shift.service';
import { CreateDoctorUserDto } from './dto/create-doctor-user.dto';
import { CreateShiftDto } from '../shift/dto/create-shift.dto';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { DoctorLoginDto } from './dto/doctor-login.dto';

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

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.doctorService.getOneByID(id);
  }

  @Post('create/user')
  async createUser(@Body() body: CreateDoctorUserDto) {
    return this.doctorService.createUser(body);
  }

  @Post('login')
  async login(@Body() body: DoctorLoginDto) {
    return this.doctorService.login(body);
  }

  @Post('create/profile')
  async createProfile(@Body() body: CreateDoctorProfileDto) {
    return this.doctorService.createProfile(body);
  }

  @Post('shift/set')
  async setShift(@Body() body: CreateShiftDto) {
    return this.shiftService.create(body);
  }
}
