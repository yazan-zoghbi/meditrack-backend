import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClinicModule } from './domain/clinic/clinic.module';
import { AuthModule } from './domain/auth/auth.module';
import { UsersModule } from './domain/users/users.module';
import { LocalJwtModule } from './modules/jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClinicModule,
    AuthModule,
    UsersModule,
    LocalJwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
