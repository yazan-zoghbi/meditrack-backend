import { ApiProperty } from "@nestjs/swagger";

export class DoctorLoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
