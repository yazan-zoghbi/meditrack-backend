import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from '../category/category.schema';

export type ServiceDocument = Service & Document;

@Schema()
export class Service {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ required: true })
  time: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
