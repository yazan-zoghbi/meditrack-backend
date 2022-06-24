import { Day } from '../days.enum';

export class UpdateShiftDto {
  days: Day[];
  start: Date;
  end: Date;
}
