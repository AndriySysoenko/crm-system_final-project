"use client";
import React, { FC, useEffect, useState } from 'react';
import { createUser, getUsers } from '@/app/service/api.service';
import CreateUserComponent from '@/app/components/user/CreateUserComponent';
import { UserDBResponse } from '@/app/models/UserDBResponse';
import Menu from '@/app/components/menu/Menu';
import UsersListComponent from '@/app/components/users/UsersListComponent';
import styles from '@/app/components/users/UsersListStyle.module.css';
import { AuthGuard } from '@/app/components/guard/AuthGuardComponent';

const UsersPage:FC= () => {
  const [data, setData] = useState<UserDBResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const users = await getUsers();
        setData(users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  const handleCreateUser = async (user:{ email: string; name: string; surname: string;}) => {
    await createUser(user);
    const updatedUsers = await getUsers();
    setData(updatedUsers);
    setIsModalOpen(false)
  };

  return (
    <div className={styles.mainBlock}>
      <AuthGuard>
      <Menu/>
      <div className={styles.statisticBlock}>
        <div></div>
        <button onClick={()=>{setIsModalOpen(true)}} className={styles.button}>CREATE</button>
      </div>

      <CreateUserComponent isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false)}} onCreate={handleCreateUser}/>
      {
        data.filter(user => user.role !== 'admin').map((user, index) => (
          <UsersListComponent item={user} key={index} index={data.length - index}/>
        ))
      }
      </AuthGuard>
    </div>
  );
}

export default UsersPage;