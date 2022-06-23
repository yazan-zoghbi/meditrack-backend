import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ClinicService {
  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
  ) {}

  async getAll(): Promise<ServiceDocument[]> {
    return this.serviceModel.find();
  }

  async getByID(id: string): Promise<ServiceDocument> {
    return this.serviceModel.findById(id);
  }
  async create(body: CreateServiceDto): Promise<ServiceDocument> {
    return this.serviceModel.create(body);
  }

  async update(id: string, body: UpdateServiceDto): Promise<ServiceDocument> {
    return this.serviceModel.findByIdAndUpdate(id, body);
  }

  async delete(id: string): Promise<ServiceDocument> {
    return this.serviceModel.findByIdAndRemove(id);
  }
}
