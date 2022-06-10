import { Category } from './category.interface';

export interface Service {
  id: number;
  name: string;
  category: Category;
}
