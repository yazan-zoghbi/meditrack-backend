import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtLocalModule } from './modules/jwt/jwt.module';
import { BcryptModule } from './modules/bcrypt/bcrypt.module';
import { AdminModule } from './domain/admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { CategoryModule } from './domain/category/category.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/scandi-clinic'),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtLocalModule,
    BcryptModule,
    AdminModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
