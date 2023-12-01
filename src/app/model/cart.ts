import { Product } from './product';

export interface Cart {
  userId?:number;
  id?: number;
  productId?: number;
  product?: Product;
  count: number;
}
