import { Module } from '@nestjs/common';
import { clinicController } from './clinic.controller';
import { ClinicService } from './clinic.service';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [],
  controllers: [clinicController],
  providers: [ClinicService, { provide: 'APP_GUARD', useClass: RolesGuard }],
})
export class ClinicModule {}
