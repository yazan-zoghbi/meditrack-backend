import { ApiProperty } from "@nestjs/swagger";

export class UpdateShiftDto {
  @ApiProperty()
  days: number[];

  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;
}
