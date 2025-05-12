'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { logout } from '@/app/service/api.service';
// import styles from './HeaderStyle.module.css'

const Menu = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setLoading(false);
      return;
    }

    fetch('http://localhost:3000/auth/validate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })
      .then(res => res.json())
      .then(data => {
        setRole(data.user?.role);
      })
      .catch(() => setRole(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <header >
      <div >
        <Link href={'/orders'}><img src={'https://i.imgur.com/pzCIhtB.png'} alt={'Logo'}/></Link>
      </div>
      <nav >
        <ul >
          {role === 'admin' && (
          <li >
            <Link href={'/adminPanel'}><img src ={'https://i.imgur.com/WwHt4eb.png'} alt={'Logo'}/>admin</Link>
          </li>
          )}
          {/*<li >*/}
          {/*  <Link href={'/logout'}>Logout</Link>*/}
          {/*</li>*/}
          <button onClick={logout}>
            <img src={'https://i.imgur.com/4gJ1g5f.png'} alt={'Logo'}/>
          </button>

        </ul>
      </nav>

    </header>
  );
};

export default Menu;