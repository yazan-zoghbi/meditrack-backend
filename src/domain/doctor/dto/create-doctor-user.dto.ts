import { ApiProperty } from "@nestjs/swagger";

export class CreateDoctorUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
