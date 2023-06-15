import { ApiProperty } from "@nestjs/swagger";

export class UpdateServiceDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  time: number;
}
