import { OrderDBResponse } from '@/app/models/OrderDBResponse';
import { UserDBResponse } from '@/app/models/UserDBResponse';
import { CreateUserType } from '@/app/models/CreateUserType';

export const getOrders = async (page: number, sort?: string): Promise<OrderDBResponse> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  if (sort) params.append('sort', sort);

  return await fetch(`http://localhost:3000/student?${params.toString()}`)
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

// const buildUrl = (page: number) => {
//   const params = new URLSearchParams({ ...queryParams, page: page.toString() });
//   return `${basePath}?${params}`};