import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BcryptModule } from 'src/modules/bcrypt/bcrypt.module';
import { JwtLocalModule } from 'src/modules/jwt/jwt.module';
import { AppointmentModule } from '../appointment/appointment.module';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import {
  PatientCredential,
  PatientCredentialSchema,
} from './schema/patient-credential.schema';
import { Patient, PatientSchema } from './schema/patient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Patient.name, schema: PatientSchema },
      { name: PatientCredential.name, schema: PatientCredentialSchema },
    ]),
    AppointmentModule,
    JwtLocalModule,
    BcryptModule,
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
