import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Appointment } from 'src/domain/appointment/appointment.schema';
import { PatientCredential } from './patient-credential.schema';
import { ChronicDiseases } from '../enums/chronic-diseases';
import { BloodType } from '../enums/blood-type';
import { ApiProperty } from '@nestjs/swagger';

export type PatientDocument = Patient & Document;

@Schema({ _id: false })
export class PatientName {
  @Prop({ required: true })
  @ApiProperty()
  first: string;

  @Prop({ required: true })
  @ApiProperty()
  last: string;
}

@Schema({ id: false })
export class Patient {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PatientCredential' })
  id: PatientCredential;

  @Prop()
  patientName: PatientName;

  @Prop({ required: true })
  birthDate: Date;

  @Prop()
  profession: string;

  @Prop({ required: true })
  bloodType: BloodType;

  @Prop()
  chronicDiseases: ChronicDiseases;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' })
  upcoming: Appointment[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' })
  finished: Appointment[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
