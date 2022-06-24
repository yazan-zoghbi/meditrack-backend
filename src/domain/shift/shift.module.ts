import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Shift, ShiftSchema } from './shift.schema';
import { ShiftService } from './shift.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shift.name, schema: ShiftSchema }]),
  ],
  providers: [ShiftService],
  exports: [ShiftService],
})
export class ShiftModule {}
