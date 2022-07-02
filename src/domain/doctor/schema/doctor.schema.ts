import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Shift } from '../../shift/shift.schema';
import { DoctorCredential } from './doctor-credential.schema';

export type DoctorDocument = Doctor & Document;

@Schema({ _id: false })
export class Name {
  @Prop({ required: true })
  first: string;

  @Prop({ required: true })
  last: string;
}

@Schema()
export class Doctor {
  @Prop({
    unique: true,
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DoctorCredential',
  })
  userID: DoctorCredential;

  @Prop({ required: true })
  name: Name;

  @Prop({ required: true })
  specialty: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }],
  })
  shifts: Shift[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
