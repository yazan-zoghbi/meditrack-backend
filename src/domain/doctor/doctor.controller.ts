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
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Doctor')
@Controller('doctors')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly shiftService: ShiftService,
  ) {}

  @Get('')
  @ApiOperation({ summary: 'List all doctors' })
  async getAll() {
    return this.doctorService.getAll();
  }

  @UseGuards(AdminJwtGuard)
  @Get('users')
  @ApiOperation({ summary: 'List all registered doctor users' })
  async getAllUsers() {
    return this.doctorService.getAllUsers();
  }

  @UseGuards(DoctorJwtGuard)
  @Get('/{doctorID}')
  @ApiOperation({ summary: 'Get a specific doctor by his ID' })
  @ApiParam({ name: 'doctorID', description: 'The ID of the doctor' })
  async getOne(@Param('doctorID') doctorID: string) {
    return this.doctorService.getOneByID(doctorID);
  }

  @UseGuards(AdminJwtGuard)
  @Post('/user')
  @ApiOperation({ summary: 'Create a new doctor user by the admin' })
  @ApiBody({ type: CreateDoctorUserDto })
  async createUser(@Body() body: CreateDoctorUserDto) {
    return this.doctorService.createUser(body);
  }

  @UseGuards(AdminJwtGuard)
  @Delete('/{doctorID')
  @ApiOperation({ summary: 'Delete a specific doctor user by the admin' })
  @ApiParam({ name: 'doctorID', description: 'The ID of the doctor' })
  async delete(@Param('doctorID') doctorID: string) {
    return this.doctorService.delete(doctorID);
  }

  @Post('/auth/login')
  @ApiOperation({ summary: 'Login as a doctor' })
  @ApiBody({ type: DoctorLoginDto })
  async login(@Body() body: DoctorLoginDto) {
    return this.doctorService.login(body);
  }

  @Post('/profile')
  @ApiOperation({ summary: 'Create a new doctor profile' })
  @ApiBody({ type: CreateDoctorProfileDto })
  async createProfile(@Body() body: CreateDoctorProfileDto) {
    return await this.doctorService.createProfile(body);
  }

  @UseGuards(DoctorJwtGuard)
  @Post('/{doctorID/shifts')
  @ApiOperation({ summary: 'Set a new shifts by the doctor' })
  async setShift(@Body() body: CreateShiftDto) {
    return this.shiftService.create(body);
  }
}
