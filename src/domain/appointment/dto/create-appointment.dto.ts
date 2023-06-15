import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateAppointmentDto {
  @ApiProperty()
  PatientID: ObjectId;

  @ApiProperty()
  DoctorID: ObjectId;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  serviceID: ObjectId;
}
