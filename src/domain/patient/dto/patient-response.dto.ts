import { ApiProperty } from '@nestjs/swagger';

export class PatientResponseDto {
  @ApiProperty({ example: 'success' })
  status: string;
}

export class PatientSignupResponseDto extends PatientResponseDto {
  @ApiProperty({ example: 'Your account created successfully!' })
  message: string;

  @ApiProperty({
    example: {
      username: 'example_username',
      email: 'example_email@example.com',
      id: 'example_id',
    },
  })
  data: {
    username: string;
    email: string;
    id: string;
  };
}
