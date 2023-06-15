import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateShiftDto {
  @ApiProperty()
  doctorID: ObjectId;

  @ApiProperty()
  days: number[];

  @ApiProperty()
  start: number;

  @ApiProperty()
  end: number;
}
