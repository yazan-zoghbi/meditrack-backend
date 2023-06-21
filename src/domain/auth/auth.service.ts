import { Injectable } from "@nestjs/common";
import { BcryptService } from "src/modules/bcrypt/bcrypt.service";
import { JwtService } from "@nestjs/jwt";
import { UserLoginDto } from "./dto/user-login.dto";
import { InjectModel } from "@nestjs/mongoose";
import {
  PatientCredential,
  PatientCredentialDocument,
} from "../patient/schema/patient-credential.schema";
import { Model } from "mongoose";
import { Role } from "src/modules/jwt/roles/role.enum";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    @InjectModel(PatientCredential.name)
    private readonly patientCredentialModel: Model<PatientCredentialDocument>
  ) {}

  private async validate(userLoginDto: UserLoginDto) {
    const userRole = userLoginDto.role;

    if (userRole === Role.Patient) {
      const patient = await this.patientCredentialModel.findOne({
        username: userLoginDto.username,
      });

      if (!patient) {
        throw new Error("User not found!");
      }

      const isValid = await this.bcryptService.comparePassword(
        userLoginDto.password,
        patient.password
      );

      if (!isValid) {
        throw new Error("Invalid credentials!");
      }

      return patient;
    }
  }

  async login(userLoginDto: UserLoginDto) {
    const user = await this.validate(userLoginDto);

    const payload = {
      id: user._id.toString(),
      username: user.username,
      role: userLoginDto.role,
    };

    const token = this.jwtService.sign(payload);
    return { user: user, token: token };
  }
}
