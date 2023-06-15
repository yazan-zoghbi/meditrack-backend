import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateServiceDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  category: ObjectId;

  @ApiProperty()
  time: number;
}
