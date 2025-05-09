'use server';

import { OrderDBResponse } from '@/app/models/OrderDBResponse';
import { UserDBResponse } from '@/app/models/UserDBResponse';
import { CreateUserType } from '@/app/models/CreateUserType';
import { cookies } from 'next/headers';

export const getOrders = async (page: number, sort?: string): Promise<OrderDBResponse> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  if (sort) params.append('sort', sort);

  const accessToken = localStorage.getItem('accessToken');
  return await fetch(`http://localhost:3000/student?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },

  })
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



export const loginAction = async (prevState: any, formData: FormData): Promise<{ accessToken: string, error: string }> => {
  const email = formData.get('email');
  const password = formData.get('password');
  try{
  const response = await fetch(`http://localhost:3000/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    if(!response.ok){
      return { accessToken: '', error: 'Invalid email or password' };
    }

    const data = await response.json();
    return { accessToken: data.accessToken, error: '' };
  } catch (error) {
    return { accessToken: '', error: 'An error occurred' };
  }

}