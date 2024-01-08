import { Address } from './address';
import { OrderStatus } from './order-status';
import { Product } from './product';

export interface Order {
  id: number;
  name: string;
  username: string;
  address: Address;
  product: Product[];
  orderStatus: OrderStatus;
  userId?: number;
  orderedProductList: Product[];
}
