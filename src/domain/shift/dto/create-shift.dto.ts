import { Day } from '../days.enum';

export class CreateShiftDto {
  doctorID: string;
  days: Day[];
  start: Date;
  end: Date;
}
