import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PatientJwtGuard } from 'src/modules/jwt/jwt.guard';
import { AppointmentService } from '../appointment/appointment.service';
import { CreateAppointmentDto } from '../appointment/dto/create-appointment.dto';
import { PatientCredentialDto } from './dto/patient-credential.dto';
import { PatientProfileDto } from './dto/patient-profile.dto';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly appointmentService: AppointmentService,
  ) {}

  @Post('signup')
  async signup(@Body() body: PatientCredentialDto) {
    return this.patientService.signup(body);
  }

  @Post('login')
  async login(@Body() body: PatientCredentialDto) {
    return await this.patientService.login(body);
  }

  @UseGuards(PatientJwtGuard)
  @Post('profile')
  async createProfile(@Body() body: PatientProfileDto) {
    return await this.patientService.createProfile(body);
  }

  @UseGuards(PatientJwtGuard)
  @Post('appointment/set')
  async setAppointment(@Body() body: CreateAppointmentDto) {
    return this.appointmentService.create(body);
  }

  @UseGuards(PatientJwtGuard)
  @Get('appointment/all/:id')
  async getAppointments(@Param('id') id: string) {
    return this.appointmentService.getPatientAppointments(id);
  }
}
