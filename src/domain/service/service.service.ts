import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './service.schema';
import { Category, CategoryDocument } from '../category/category.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ClinicService {
  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async getAll(): Promise<ServiceDocument[]> {
    return this.serviceModel.find().populate('category', 'name');
  }

  async getByID(id: string): Promise<ServiceDocument> {
    return this.serviceModel.findById(id);
  }
  async create(body: CreateServiceDto): Promise<ServiceDocument> {
    const service = await this.serviceModel.create(body);
    const category = await this.categoryModel
      .findOne({ _id: body.category })
      .exec();
    category.services.push(service);
    category.save();
    return service;
  }

  async update(id: string, body: UpdateServiceDto): Promise<ServiceDocument> {
    return this.serviceModel.findByIdAndUpdate(id, body);
  }

  async delete(id: string): Promise<ServiceDocument> {
    return this.serviceModel.findByIdAndRemove(id);
  }
}
