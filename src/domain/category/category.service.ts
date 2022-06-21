import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async getCategories(): Promise<CategoryDocument[]> {
    return this.categoryModel.find();
  }

  async getCategory(id: string): Promise<CategoryDocument> {
    return this.categoryModel.findById(id);
  }

  async createCategory(category: CreateCategoryDto): Promise<CategoryDocument> {
    return this.categoryModel.create(category);
  }

  async updateCategory(
    id: string,
    category: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    return this.categoryModel.findByIdAndUpdate(id, category);
  }

  async deleteCategory(id: string): Promise<CategoryDocument> {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
