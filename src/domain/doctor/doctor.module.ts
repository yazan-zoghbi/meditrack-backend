import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { JwtLocalModule } from 'src/modules/jwt/jwt.module';
import { BcryptModule } from 'src/modules/bcrypt/bcrypt.module';
import { ServiceModule } from '../service/service.module';
import { Doctor, DoctorSchema } from './schema/doctor.schema';
import {
  DoctorCredential,
  DoctorCredentialSchema,
} from './schema/doctor-credential.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Doctor.name, schema: DoctorSchema },
      { name: DoctorCredential.name, schema: DoctorCredentialSchema },
    ]),
    JwtLocalModule,
    BcryptModule,
    ServiceModule,
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
