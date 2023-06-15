import { ApiProperty } from "@nestjs/swagger";

export class PatientCredentialDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
