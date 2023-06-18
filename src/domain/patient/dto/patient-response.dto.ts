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
    id: string;
    username: string;
    email: string;
  };
}

export class PatientLoginResponseDto extends PatientResponseDto {
  @ApiProperty({ example: 'You have successfully logged in.' })
  message: string;

  @ApiProperty({
    example: {
      patient: {
        id: '648e84ff0aea4e7ba2773e4c',
        username: 'johndoe',
        email: 'john@test.com',
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UyIiwicm9sZSI6InBhdGllbnQiLCJpYXQiOjE2ODcwODIwMTN9.H-w4f57IUdIfXsuLuwN3LFnrSc02yO4xj9yK8XwKkXY',
    },
  })
  data: {
    patient: {
      id: string;
      username: string;
      email: string;
    };
    token: string;
  };
}
