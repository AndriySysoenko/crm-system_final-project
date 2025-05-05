import { OrderDBResponse } from '@/app/models/OrderDBResponse';
import { UserDBResponse } from '@/app/models/UserDBResponse';
import { CreateUserType } from '@/app/models/CreateUserType';

export const getOrders = async (page: number): Promise<OrderDBResponse> => {
  return await fetch(`http://localhost:3000/student?page=${page}`)
  .then(value => value.json());
};

export const getUsers = async (): Promise<UserDBResponse[]> => {
  return await fetch(`http://localhost:3000/user`)
  .then(value => value.json());
};

export const createUser = async (user: CreateUserType): Promise<UserDBResponse> => {
  return await fetch(`http://localhost:3000/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  .then(value => value.json());
};