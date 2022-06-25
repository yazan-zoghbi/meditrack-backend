import { Injectable } from '@nestjs/common';
import { CreateDoctorUserDto } from './dto/create-doctor-user.dto';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { DoctorLoginDto } from './dto/doctor-login.dto';
import { DoctorJwtPayload } from './dto/doctor-jwt-payload.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor, DoctorDocument } from './schema/doctor.schema';
import { Model } from 'mongoose';
import {
  DoctorCredential,
  DoctorCredentialDocument,
} from './schema/doctor-credential.schema';
import { BcryptService } from 'src/modules/bcrypt/bcrypt.service';
import { Role } from 'src/modules/jwt/roles/role.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DoctorService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,
    @InjectModel(DoctorCredential.name)
    private readonly doctorCredentialModel: Model<DoctorCredentialDocument>,
  ) {}

  private async validate(body: DoctorLoginDto) {
    const doctor = await this.doctorCredentialModel.findOne({
      username: body.username,
    });

    if (!doctor) {
      throw new Error('Doctor not found!');
    }

    const isValid = await this.bcryptService.comparePassword(
      body.password,
      doctor.password,
    );

    if (!isValid) {
      throw new Error('Invalid password');
    }

    return doctor;
  }

  async createUser(body: CreateDoctorUserDto) {
    const doctorUser: CreateDoctorUserDto = {
      username: body.username,
      password: await this.bcryptService.hashPassword(body.password),
    };

    return this.doctorCredentialModel.create(doctorUser);
  }

  async createProfile(body: CreateDoctorProfileDto) {
    return this.doctorModel.create(body);
  }

  async login(body: DoctorLoginDto) {
    const admin = await this.validate(body);

    const payload: DoctorJwtPayload = {
      username: admin.username,
      role: Role.Doctor,
    };

    const token = this.jwtService.sign(payload);
    return token;
  }

  async getAll() {
    return this.doctorModel.find();
  }

  async getOneByID(id: string) {
    return this.doctorModel.findById(id);
  }
}
