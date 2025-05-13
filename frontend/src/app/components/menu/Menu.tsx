'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { logout } from '@/app/service/api.service';
import styles from './HeaderStyle.module.css'
import { useRouter } from 'next/navigation';


const Menu = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    <header className={styles.headerStyle}>
      <div className={styles.logo}>
        <Link href={'/orders'}><img src= "/images/logo.png" alt={'Logo'}/></Link>
      </div>
      <nav className={styles.menu}>
        {/*<ul className={styles.menu}>*/}
        {/*  {role === 'admin' && (*/}
        {/*    <li className={styles.viewItem}>*/}
        {/*      admin*/}
        {/*      /!*<Link href={'/adminPanel'}><img src="/images/adminPanel.png" alt={'Admin Panel'} /></Link>*!/*/}
        {/*    </li>*/}
        {/*  )}*/}
          {/*<li >*/}
          {/*  <Link href={'/logout'}>Logout</Link>*/}
          {/*</li>*/}
          <p className={styles.text}>admin</p>
          {role === 'admin' && (
          <button onClick={()=>router.push('/adminPanel')} className={styles.button}>
            <img src="/images/adminPanel.png" alt={'Admin Panel' } className={styles.viewItem}/>
          </button>
          )}

          <button onClick={logout} className={styles.button}>
            <img src="/images/logout.png" alt={'Logout'} className={styles.viewItem}/>
          </button>

        {/*</ul>*/}
      </nav>

    </header>
  );
};

export default Menu;