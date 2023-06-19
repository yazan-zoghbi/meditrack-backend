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
    const patient = await this.patientModel.findById(body.PatientID);
    const doctor = await this.doctorModel.findById(body.DoctorID);
    const service = await this.serviceModel.findById(body.serviceID);

    if (!patient) throw new Error('Make sure to complete your profile first');

    if (!doctor) throw new Error('Doctor not found!');

    if (!service) throw new Error('Service not found!');

    body.date = new Date(body.date);

    return body;
  }

  async create(body: CreateAppointmentDto) {
    const appointment = this.appointmentModel.create(
      await this.validator(body),
    );

    const response = {
      id: (await appointment).id,
      Patient: (await this.patientModel.findById(body.PatientID)).patientName,
      Doctor: (await this.doctorModel.findById(body.DoctorID)).name,
      Date: (await appointment).date,
      Service: (await this.serviceModel.findById(body.serviceID)).name,
    };
    return response;
  }

  async getPatientAppointments(PatientID: string) {
    const query = await this.appointmentModel
      .find()
      .where('PatientID')
      .equals(PatientID)
      .select('DoctorID date serviceID')
      .exec();

    return query;
  }
}
