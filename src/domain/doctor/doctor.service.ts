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
    const userExist = await this.doctorCredentialModel.exists({
      _id: body.userID,
    });

    if (!userExist) {
      throw new Error('User is Not Exist');
    }

    const profileExist = await this.doctorModel.findOne({
      userID: body.userID,
    });

    if (!profileExist) {
      return await this.doctorModel.create(body);
    } else throw new Error('Profile Already Exist');
  }

  async login(body: DoctorLoginDto) {
    const doctor = await this.validate(body);

    const payload: DoctorJwtPayload = {
      username: doctor.username,
      role: Role.Doctor,
    };

    const token = this.jwtService.sign(payload);
    return { doctor: doctor, token: token };
  }

  async getAll() {
    return await this.doctorModel.find().populate('shifts');
  }

  async getAllUsers() {
    return await this.doctorCredentialModel.find();
  }

  async getOneByID(id: string) {
    return await this.doctorModel.findById(id).populate('shifts').exec();
  }

  async delete(id: string) {
    const doctorUser = await this.doctorCredentialModel.findOne({ _id: id });

    if (!doctorUser) {
      throw new Error('User Not Found');
    }

    await this.doctorCredentialModel.findByIdAndDelete(id);
    await this.doctorModel.deleteMany({ userID: id });
    return doctorUser;
  }
}
