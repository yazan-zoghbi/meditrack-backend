import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Shift } from '../../shift/shift.schema';

export type DoctorDocument = Doctor & Document;

@Schema({ _id: false })
export class Doctor {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DoctorCredential',
  })
  id: string;

  @Prop({ required: true })
  name: {
    first: string;
    last: string;
  };

  @Prop({ required: true })
  specialty: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Shift' })
  shifts: Shift[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
