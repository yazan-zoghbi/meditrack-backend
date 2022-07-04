import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
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

  private async dateValidator(days: number[]) {
    if (!days) {
      throw new Error('should enter valid date');
    }

    const workingDays = days.map((day, i) => {
      return weekday[days[i]];
    });

    return workingDays;
  }

  private async limitValidator(id: ObjectId) {
    const shiftCount = await this.shiftModel.find({ doctorId: id }).count();

    if (shiftCount >= 2) {
      throw new Error('Failed! you reach your shifts number limit!');
    }
  }

  private async timeValidator(id: ObjectId, start: number, end: number) {
    if (!start || !end)
      throw new Error(
        'make sure to enter valid shift time for starting & end hours',
      );

    if (start < end) throw new Error('failure in setting a valid shift time');

    const shifts = await this.shiftModel.find({ doctorId: id }).count();

    if (shifts == 1) {
      const firstShift = await this.shiftModel.findOne({ doctorId: id });

      if (
        firstShift.start > start ||
        firstShift.start > end ||
        firstShift.end > start ||
        firstShift.end > end
      ) {
        throw new Error('failure in setting a valid shift time');
      }
    }

    return { start, end };
  }

  async create(body: CreateShiftDto) {
    await this.limitValidator(body.doctorID);
    const workingDays = await this.dateValidator(body.days);
    const time = await this.timeValidator(body.doctorID, body.start, body.end);
    const shift = await this.shiftModel.create({
      doctorId: body.doctorID,
      days: workingDays,
      start: time.start,
      end: time.end,
    });
    const doctor = await this.doctorModel.findById(body.doctorID);
    doctor.shifts.push(shift);
    doctor.save();
    return shift;
  }

  async update(id: ObjectId, body: UpdateShiftDto) {
    return this.shiftModel.findByIdAndUpdate(id, body);
  }

  async delete(id: ObjectId) {
    return this.shiftModel.findByIdAndDelete(id);
  }
}
