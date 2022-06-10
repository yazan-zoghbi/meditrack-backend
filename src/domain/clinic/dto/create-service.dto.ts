import { Category } from '../interfaces/category.interface';

export class CreateServiceDto {
  id: number;
  name: string;
  category: Category;
}
