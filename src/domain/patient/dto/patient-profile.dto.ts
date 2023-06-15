import { ApiProperty } from "@nestjs/swagger";

export class PatientProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: {
    first: string;
    last: string;
  };
}
