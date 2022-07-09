import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Doctor } from '../doctor/schema/doctor.schema';
import { Patient } from '../patient/schema/patient.schema';
import { Service } from '../service/service.schema';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  })
  PatientID: Patient;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  })
  DoctorID: Doctor;

  @Prop()
  active: boolean;

  @Prop({ required: true })
  date: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  })
  serviceID: Service;
}

export const appointmentSchema = SchemaFactory.createForClass(Appointment);
