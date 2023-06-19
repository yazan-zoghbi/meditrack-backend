import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PatientJwtGuard } from 'src/modules/jwt/jwt.guard';
import { AppointmentService } from '../appointment/appointment.service';
import { CreateAppointmentDto } from '../appointment/dto/create-appointment.dto';
import { PatientCredentialDto } from './dto/patient-credential.dto';
import { PatientProfileDto } from './dto/patient-profile.dto';
import { PatientService } from './patient.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  PatientLoginResponseDto,
  PatientSignupResponseDto,
} from './dto/patient-response.dto';

@ApiTags('Patient')
@Controller('patients')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly appointmentService: AppointmentService,
  ) {}

  @Post('/auth/signup')
  @ApiOperation({ summary: 'Register a new patient' })
  @ApiBody({ type: PatientCredentialDto })
  @ApiCreatedResponse({
    description: 'Your account created successfully!',
    type: PatientSignupResponseDto,
  })
  @HttpCode(201)
  async signup(@Body() body: PatientCredentialDto) {
    const newPatient = await this.patientService.signup(body);

    if (newPatient) {
      const response: PatientSignupResponseDto = {
        status: 'success',
        message: 'Your account created successfully!',
        data: {
          username: body.username,
          email: body.email,
          id: newPatient._id.toString(),
        },
      };
      return response;
    } else return { message: 'error!' };
  }

  @Post('/auth/login')
  @ApiOperation({ summary: 'Login as a patient' })
  @ApiBody({ type: PatientCredentialDto })
  @ApiResponse({
    description: 'You have successfully logged in.',
    type: PatientLoginResponseDto,
  })
  @HttpCode(200)
  async login(@Body() body: PatientCredentialDto) {
    const loggedInPatient = await this.patientService.login(body);
    const response: PatientLoginResponseDto = {
      status: 'success',
      message: 'You have successfully logged in.',
      data: {
        patient: {
          id: loggedInPatient.patient._id.toString(),
          username: loggedInPatient.patient.username,
          email: loggedInPatient.patient.email,
        },
        token: loggedInPatient.token,
      },
    };
    return response;
  }

  @UseGuards(PatientJwtGuard)
  @Post('/:patientID/profile')
  @ApiOperation({ summary: 'Create a profile by patient' })
  @ApiBody({ type: PatientProfileDto })
  async createProfile(
    @Param('patientID') patientID: string,
    @Body() body: PatientProfileDto,
  ) {
    return await this.patientService.createProfile(patientID, body);
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
