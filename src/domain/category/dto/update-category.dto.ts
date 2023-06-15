import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
