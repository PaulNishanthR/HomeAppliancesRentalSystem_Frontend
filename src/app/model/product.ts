import { Category } from './category';
import { FileType } from './file-type';

export interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  photo?: FileType;
  categoryId?: number;
  category?: Category;
  count?: number;
}
