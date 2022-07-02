import { ObjectId } from 'mongoose';

export class CreateShiftDto {
  doctorID: ObjectId;
  days: number[];
  start: number;
  end: number;
}
