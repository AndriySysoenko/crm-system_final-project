import { OrderDBResponse } from '@/app/models/OrderDBResponse';

export const getOrders = async (page: number): Promise<OrderDBResponse> => {
  return await fetch(`http://localhost:3000/student?page=${page}`)
  .then(value => value.json());
};