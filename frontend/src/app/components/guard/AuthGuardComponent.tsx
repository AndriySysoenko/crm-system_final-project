'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.replace('/login');
      return;
    }

    fetch('http://localhost:3000/auth/validate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Invalid token');
        return res.json();
      })
      .then(() => setAuthorized(true))
      .catch(() => {
        localStorage.removeItem('accessToken');
        router.replace('/login');
      });
  }, [router]);

  if (!authorized) return <div>Loading...</div>;

  return <>{children}</>;
};