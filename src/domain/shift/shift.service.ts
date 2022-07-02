import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from '../doctor/schema/doctor.schema';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { Shift, ShiftDocument } from './shift.schema';

const weekday = [
  'saturday',
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
];

@Injectable()
export class ShiftService {
  constructor(
    @InjectModel(Shift.name)
    private readonly shiftModel: Model<ShiftDocument>,
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,
  ) {}

  async create(body: CreateShiftDto) {
    if (!body.days) {
      throw new Error('should enter valid date');
    }

    const days: string[] = body.days.map((day, i) => {
      return weekday[body.days[i]];
    });

    const shift = await this.shiftModel.create({
      doctorId: body.doctorID,
      days: days,
      start: body.start,
      end: body.end,
    });
    const doctor = await this.doctorModel.findById(body.doctorID);
    doctor.shifts.push(shift);
    doctor.save();
    return shift;
  }

  async update(id: string, body: UpdateShiftDto) {
    return this.shiftModel.findByIdAndUpdate(id, body);
  }

  async delete(id: string) {
    return this.shiftModel.findByIdAndDelete(id);
  }
}
