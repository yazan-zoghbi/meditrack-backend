import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AdminJwtPayload } from 'src/domain/admin/dto/admin-jwt-payload.dto';
import { DoctorJwtPayload } from 'src/domain/doctor/dto/doctor-jwt-payload.dto';
import { PatientJwtPayload } from 'src/domain/patient/dto/patient-jwt-payload.dto';
import { Role } from './roles/role.enum';

@Injectable()
export class AdminJwtServiceStrategy extends PassportStrategy(
  Strategy,
  Role.Admin,
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: AdminJwtPayload) {
    if (payload.role !== Role.Admin) {
      return null;
    }
    return payload;
  }
}

@Injectable()
export class DoctorJwtServiceStrategy extends PassportStrategy(
  Strategy,
  Role.Doctor,
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: DoctorJwtPayload) {
    if (payload.role !== Role.Doctor) {
      return null;
    }
    return payload;
  }
}

@Injectable()
export class PatientJwtServiceStrategy extends PassportStrategy(
  Strategy,
  Role.Patient,
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: PatientJwtPayload) {
    if (payload.role !== Role.Patient) {
      return null;
    }
    return payload;
  }
}
