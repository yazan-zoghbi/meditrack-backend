import { Category } from 'src/domain/category/category.schema';

export class CreateServiceDto {
  name: string;
  category: Category;
  time: number;
}
