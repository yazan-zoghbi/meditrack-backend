import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Appointment } from 'src/domain/appointment/appointment.schema';
import { PatientCredential } from './patient-credential.schema';

export type PatientDocument = Patient & Document;

@Schema({ _id: false })
export class Name {
  @Prop({ required: true })
  first: string;

  @Prop({ required: true })
  last: string;
}

@Schema({ id: false })
export class Patient {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PatientCredential' })
  id: PatientCredential;

  @Prop({ required: true })
  name: Name;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' })
  upcoming: Appointment[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' })
  finished: Appointment[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
