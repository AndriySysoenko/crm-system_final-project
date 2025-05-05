"use client";
import React, { FC, useEffect, useState } from 'react';
import { createUser, getUsers } from '@/app/service/api.service';
import CreateUserComponent from '@/app/components/users/CreateUserComponent';
import { UserDBResponse } from '@/app/models/UserDBResponse';

const UsersPage:FC= () => {
  // const data  = await getUsers();
  const [data, setData] = useState<UserDBResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setData(users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUsers()
  }, []);

  const handleCreateUser = async (user:{ email: string; name: string; surname: string;}) => {
    const newUser =  await createUser(user);
    const updatedUsers = await getUsers();
    setData(updatedUsers);
    setIsModalOpen(false)
  };

  return (
    <div>
      <button onClick={()=>{setIsModalOpen(true)}}>Create</button>

      <CreateUserComponent isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false)}} onCreate={handleCreateUser}/>
      {
        data.filter(user => user.role !== 'admin').map((user, index) => (
          <div key={index}>
            <p>id:{data.length - index}</p>
            <p>email:{user.email}</p>
            <p>name:{user.name}</p>
            <p>surname:{user.surname}</p>
            <p>is_active:{String(user.is_active)}</p>
            <p>last_login:{user.last_login ? user.last_login.toLocaleString() : 'null'}</p>
          </div>
        ))
      }</div>
  );
}

export default UsersPage;