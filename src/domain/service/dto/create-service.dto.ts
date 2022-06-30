import { ObjectId } from 'mongoose';

export class CreateServiceDto {
  name: string;
  category: ObjectId;
  time: number;
}
