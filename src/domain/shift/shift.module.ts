import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from '../doctor/schema/doctor.schema';
import { Shift, ShiftSchema } from './shift.schema';
import { ShiftService } from './shift.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shift.name, schema: ShiftSchema },
      { name: Doctor.name, schema: DoctorSchema },
    ]),
  ],
  providers: [ShiftService],
  exports: [ShiftService],
})
export class ShiftModule {}
