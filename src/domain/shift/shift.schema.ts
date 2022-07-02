import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Doctor } from '../doctor/schema/doctor.schema';

export type ShiftDocument = Shift & Document;

@Schema()
export class Shift {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  doctorId: Doctor;

  @Prop({ required: true })
  days: string[];

  @Prop({ required: true })
  start: number;

  @Prop({ required: true })
  end: number;
}

export const ShiftSchema = SchemaFactory.createForClass(Shift);
