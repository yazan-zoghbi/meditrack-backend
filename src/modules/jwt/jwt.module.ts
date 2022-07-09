import { Module, Global } from '@nestjs/common';
import {
  AdminJwtServiceStrategy,
  DoctorJwtServiceStrategy,
  PatientJwtServiceStrategy,
} from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
        };
      },
    }),
  ],

  providers: [
    AdminJwtServiceStrategy,
    DoctorJwtServiceStrategy,
    PatientJwtServiceStrategy,
  ],
  exports: [JwtModule],
})
export class JwtLocalModule {}
