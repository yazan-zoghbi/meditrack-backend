import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Doctor } from '../doctor/schema/doctor.schema';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export type ShiftDocument = Shift & Document;

@Schema()
export class Shift {

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  doctorId: Doctor;

  @ApiProperty()
  @Prop({ required: true })
  days: string[];

  @ApiProperty()
  @Prop({ required: true })
  start: number;

  @ApiProperty()
  @Prop({ required: true })
  end: number;
}

export const ShiftSchema = SchemaFactory.createForClass(Shift);
