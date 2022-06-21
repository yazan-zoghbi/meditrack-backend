import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Role } from './roles/role.enum';

@Injectable()
export class AdminJwtGuard extends AuthGuard(Role.Admin) {}
@Injectable()
export class DoctorJwtGuard extends AuthGuard(Role.Doctor) {}
@Injectable()
export class PatientJwtGuard extends AuthGuard(Role.Patient) {}
