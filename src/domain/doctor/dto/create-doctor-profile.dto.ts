import { ObjectId } from 'mongoose';
import { Shift } from 'src/domain/shift/shift.schema';

export class CreateDoctorProfileDto {
  userID: ObjectId;
  name: {
    first: string;
    last: string;
  };
  specialty: string;
  shifts: Shift[];
}
