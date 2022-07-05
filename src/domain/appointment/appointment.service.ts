import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from '../doctor/schema/doctor.schema';
import { Patient, PatientDocument } from '../patient/schema/patient.schema';
import { Service, ServiceDocument } from '../service/service.schema';
import { Appointment, AppointmentDocument } from './appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
  ) {}

  private async validator(body: CreateAppointmentDto) {
    const patient = await this.patientModel.findById(body.patientID);
    const doctor = await this.doctorModel.findById(body.doctorID);
    const service = await this.serviceModel.findById(body.serviceID);
    const date = new Date(body.date);

    if (!patient) throw new Error('Make sure to complete your profile first');

    if (!doctor) throw new Error('Doctor not found!');

    if (!service) throw new Error('Service not found!');
  }

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
