import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { Shift, ShiftDocument } from './shift.schema';

@Injectable()
export class ShiftService {
  constructor(
    @InjectModel(Shift.name)
    private readonly shiftModel: Model<ShiftDocument>,
  ) {}
  async create(body: CreateShiftDto) {
    return this.shiftModel.create(body);
  }

  async update(id: string, body: UpdateShiftDto) {
    return this.shiftModel.findByIdAndUpdate(id, body);
  }

  async delete(id: string) {
    return this.shiftModel.findByIdAndDelete(id);
  }
}
