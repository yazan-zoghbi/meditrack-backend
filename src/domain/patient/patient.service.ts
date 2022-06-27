import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BcryptService } from 'src/modules/bcrypt/bcrypt.service';
import { Role } from 'src/modules/jwt/roles/role.enum';
import { PatientCredentialDto } from './dto/patient-credential.dto';
import {
  PatientCredential,
  PatientCredentialDocument,
} from './schema/patient-credential.schema';
import { Patient, PatientDocument } from './schema/patient.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
    @InjectModel(PatientCredential.name)
    private readonly patientCredentialModel: Model<PatientCredentialDocument>,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  private async validate(body: PatientCredentialDto) {
    const patient = await this.patientCredentialModel.findOne({
      username: body.username,
    });

    if (!patient) {
      throw new Error('User not found!');
    }

    const isValid = await this.bcryptService.comparePassword(
      body.password,
      patient.password,
    );

    if (!isValid) {
      throw new Error('Invalid credentials!');
    }

    return patient;
  }

  async signup(body: PatientCredentialDto) {
    return await this.patientCredentialModel.create(body);
  }

  async login(body: PatientCredentialDto) {
    const patient = await this.validate(body);

    const payload = { username: patient.username, role: Role.Patient };

    const token = this.jwtService.sign(payload);
    return token;
  }
}
