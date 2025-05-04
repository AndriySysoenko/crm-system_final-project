import { IOrder } from '@/app/models/IOrder';

export type OrderDBResponse = {
  page: number;
  pages: number;
  limit: number;
  total: number;
  data: IOrder[];
}