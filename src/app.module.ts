import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClinicModule } from './domain/clinic/clinic.module';
import { AuthModule } from './domain/auth/auth.module';
import { UsersModule } from './domain/users/users.module';

@Module({
  imports: [ClinicModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
