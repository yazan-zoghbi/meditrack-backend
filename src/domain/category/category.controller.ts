import {
  Controller,
  Body,
  Post,
  Put,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AdminJwtGuard } from 'src/modules/jwt/jwt.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('get')
  async get() {
    return this.categoryService.getCategories();
  }

  @Get('get/:id')
  async getById(@Param('id') id: string) {
    return this.categoryService.getCategory(id);
  }

  @UseGuards(AdminJwtGuard)
  @Post('create')
  async create(@Body() body: CreateCategoryDto) {
    return this.categoryService.createCategory(body);
  }

  @UseGuards(AdminJwtGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, body);
  }

  @UseGuards(AdminJwtGuard)
  @Post('delete/:id')
  async delete(@Param('id') @Body() id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
