import Link from 'next/link';
import React from 'react';
// import styles from './HeaderStyle.module.css'

const Menu = () => {
  return (
    <header >
      <div >
        <Link href={'/orders'}><img src={'https://i.imgur.com/wY6rCrc.png'} alt={'Logo'}/></Link>
      </div>
      <nav >
        <ul >
          <li >
            <Link href={'/adminPanel'}>admin</Link>
          </li>
          <li >
            <Link href={'/logout'}>Logout</Link>
          </li>

        </ul>
      </nav>

    </header>
  );
};

export default Menu;