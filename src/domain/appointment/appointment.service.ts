import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
  ) {}

  async create(body: CreateAppointmentDto) {
    return this.appointmentModel.create(body);
  }

  async getPatientAppointments(PatientID: string) {
    const appointment = this.appointmentModel
      .find()
      .where('PatientID')
      .equals(PatientID);

    return appointment;
  }
}
