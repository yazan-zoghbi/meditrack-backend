import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Admin, AdminDocument } from './admin.schema';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../../modules/bcrypt/bcrypt.service';
import { AdminJwtPayload } from './dto/admin-jwt-payload.dto';
import { Role } from 'src/modules/jwt/roles/role.enum';

// eslint-disable-next-line prettier/prettier
Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  private async validate(body: AdminLoginDto) {
    const admin = await this.adminModel.findOne({ username: body.username });

    if (!admin) {
      throw new Error('Admin not found');
    }

    const isValid = await this.bcryptService.comparePassword(
      body.password,
      admin.password,
    );

    if (!isValid) {
      throw new Error('Invalid password');
    }

    return admin;
  }

  async login(body: AdminLoginDto) {
    const admin = await this.validate(body);

    const payload: AdminJwtPayload = {
      username: admin.username,
      role: Role.Admin,
    };

    const token = this.jwtService.sign(payload);
    return token;
  }

  async add(body: AdminLoginDto) {
    const admin = {
      username: body.username,
      password: await this.bcryptService.hashPassword(body.password),
    };

    return this.adminModel.create(admin);
  }

  async delete(body: AdminLoginDto) {
    await this.validate(body);
    return this.adminModel.deleteOne({ username: body.username });
  }
}
