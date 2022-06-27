import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppointmentService } from '../appointment/appointment.service';
import { CreateAppointmentDto } from '../appointment/dto/create-appointment.dto';
import { PatientCredentialDto } from './dto/patient-credential.dto';
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
    return this.patientService.login(body);
  }

  @Post('Appointment/set')
  async setAppointment(@Body() body: CreateAppointmentDto) {
    return this.appointmentService.create(body);
  }

  @Get('appointment/:id')
  async getAppointments(@Param('id') id: string) {
    return this.appointmentService.getPatientAppointments(id);
  }
}
