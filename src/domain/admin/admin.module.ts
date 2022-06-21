import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminSchema, Admin } from './admin.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtLocalModule } from '../../modules/jwt/jwt.module';
import { BcryptModule } from '../../modules/bcrypt/bcrypt.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    JwtLocalModule,
    BcryptModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
