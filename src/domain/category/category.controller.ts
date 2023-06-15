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
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  @ApiOperation({summary: 'List all stored categories'})
  async get() {
    return this.categoryService.getCategories();
  }

  @Get('/{categoryID}')
  @ApiOperation({summary: 'Get a specific category by its ID'})
  @ApiParam({name: 'categoryID',description: 'The ID of the category' })
  async getById(@Param('categoryID') categoryID: string) {
    return this.categoryService.getCategory(categoryID);
  }

  @UseGuards(AdminJwtGuard)
  @Post('')
  @ApiOperation({summary: 'Create a new category'})
  async create(@Body() body: CreateCategoryDto) {
    return this.categoryService.createCategory(body);
  }

  @UseGuards(AdminJwtGuard)
  @Put('/{categoryID}')
  @ApiOperation({summary: 'Update a specific category using its ID'})
  @ApiParam({name: 'categoryID',description: 'The ID of the category' })
  async update(@Param('categoryID') categoryID: string, @Body() body: UpdateCategoryDto) {
    return this.categoryService.updateCategory(categoryID, body);
  }

  @UseGuards(AdminJwtGuard)
  @Post('/{categoryID}')
  @ApiOperation({summary: 'Delete a specific category using its ID'})
  @ApiParam({name: 'categoryID',description: 'The ID of the category' })
  async delete(@Param('categoryID') @Body() categoryID: string) {
    return this.categoryService.deleteCategory(categoryID);
  }
}
