import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ChronicDiseases } from '../enums/chronic-diseases';
import { BloodType } from '../enums/blood-type';
import { PatientName } from '../schema/patient.schema';

export class PatientProfileDto {
  @ApiProperty({ type: PatientName })
  name: PatientName;

  @ApiProperty({ example: '03/17/1987' })
  birthDate: string = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  @ApiPropertyOptional()
  profession: string;

  @ApiProperty({ enum: BloodType, enumName: 'Blood Type' })
  bloodType: BloodType;

  @ApiPropertyOptional({ enum: ChronicDiseases, enumName: 'Chronic Diseases' })
  chronicDiseases?: ChronicDiseases;
}
