import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Day } from './days.enum';
import { Doctor } from '../doctor/';

export type ShiftDocument = Shift & Document;

@Schema()
export class Shift {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  doctorId: Doctor;

  @Prop({ required: true })
  days: Day[];

  @Prop({ required: true })
  start: Date;

  @Prop({ required: true })
  end: Date;
}

export const ShiftSchema = SchemaFactory.createForClass(Shift);
