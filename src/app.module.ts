import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtLocalModule } from './modules/jwt/jwt.module';
import { BcryptModule } from './modules/bcrypt/bcrypt.module';
import { AdminModule } from './domain/admin/admin.module';
import { CategoryModule } from './domain/category/category.module';
import { ServiceModule } from './domain/service/service.module';
import { ShiftModule } from './domain/shift/shift.module';
import { DoctorModule } from './domain/doctor/doctor.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/scandi-clinic'),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtLocalModule,
    BcryptModule,
    AdminModule,
    DoctorModule,
    CategoryModule,
    ServiceModule,
    ShiftModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
