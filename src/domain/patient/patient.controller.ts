import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PatientJwtGuard } from 'src/modules/jwt/jwt.guard';
import { AppointmentService } from '../appointment/appointment.service';
import { CreateAppointmentDto } from '../appointment/dto/create-appointment.dto';
import { PatientCredentialDto } from './dto/patient-credential.dto';
import { PatientProfileDto } from './dto/patient-profile.dto';
import { PatientService } from './patient.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly appointmentService: AppointmentService,
  ) {}

  @Post('/auth/signup')
  @ApiOperation({ summary: 'Register a new patient' })
  @ApiBody({ type: PatientCredentialDto })
  async signup(@Body() body: PatientCredentialDto) {
    return this.patientService.signup(body);
  }

  @Post('/auth/login')
  @ApiOperation({ summary: 'Login as a patient' })
  @ApiBody({ type: PatientCredentialDto })
  async login(@Body() body: PatientCredentialDto) {
    return await this.patientService.login(body);
  }

  @UseGuards(PatientJwtGuard)
  @Post('/{patientID}/profile')
  @ApiOperation({ summary: 'Create a profile by patient' })
  @ApiBody({ type: PatientProfileDto })
  async createProfile(@Body() body: PatientProfileDto) {
    return await this.patientService.createProfile(body);
  }

  @UseGuards(PatientJwtGuard)
  @Post('/{patientID}/appointments')
  @ApiOperation({ summary: 'Set a new appointment by patient' })
  @ApiBody({ type: CreateAppointmentDto })
  async setAppointment(@Body() body: CreateAppointmentDto) {
    return this.appointmentService.create(body);
  }

  @UseGuards(PatientJwtGuard)
  @Get('/{patientID}/appointments')
  @ApiOperation({ summary: 'List all appointments by patient' })
  @ApiParam({ name: 'patientID', description: 'The ID of the patient' })
  async getAppointments(@Param('patientID') patientID: string) {
    return this.appointmentService.getPatientAppointments(patientID);
  }
}
