import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Shift } from 'src/domain/shift/shift.schema';

export class CreateDoctorProfileDto {
  @ApiProperty()
  userID: ObjectId;

  @ApiProperty()
  name: {
    first: string;
    last: string;
  };

  @ApiProperty()
  specialty: string;

  @ApiProperty({ type: Shift })
  shifts: Shift[];
}
