import React, { FC } from 'react';
import { UserDBResponse } from '@/app/models/UserDBResponse';
import styles from './UsersListStyle.module.css';

type UsersProps = {
  item: UserDBResponse
  index: number
};

const UsersListComponent:FC<UsersProps> = ({ item, index }) => {

  return (
    <div className={styles.container}>
      {
        <div className={styles.usersBlock}>
          <p>id: {index}</p>
          <p>email: {item.email}</p>
          <p>name: {item.name}</p>
          <p>surname: {item.surname}</p>
          <p>is_active: {String(item.is_active)}</p>
          <p>last_login: {item.last_login ? item.last_login.toLocaleString() : 'null'}</p>
        </div>
      }
    </div>
  );
}

export default UsersListComponent;