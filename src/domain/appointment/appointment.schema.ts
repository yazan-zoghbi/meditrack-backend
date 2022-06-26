import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date } from 'mongoose';
import { DoctorCredential } from '../doctor/schema/doctor-credential.schema';
import { PatientCredential } from '../patient/schema/patient-credential.schema';
import { Service } from '../service/service.schema';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PatientCredential',
  })
  PatientID: PatientCredential;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DoctorCredential',
  })
  DoctorID: DoctorCredential;

  @Prop()
  active: boolean;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  service: Service;
}

export const appointmentSchema = SchemaFactory.createForClass(Appointment);
