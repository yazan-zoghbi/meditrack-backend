import { Shift } from 'src/domain/shift/shift.schema';

export class CreateDoctorProfileDto {
  id: string;
  name: {
    first: string;
    last: string;
  };
  specialty: string;
  shifts: Shift[];
}
