'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { loginAction } from '@/app/service/api.service';
import { useRouter } from 'next/navigation';
import LoginComponent from '@/app/components/login/LoginComponent';


const LoginPage =() => {
const [state, formAction] = useActionState(loginAction, {accessToken: '', error: ''});
const [formErrors, setFormErrors] = useState<{ email?: string; password?: string;}>({});
const router = useRouter();

  useEffect(() => {
    if(state.accessToken) {
      localStorage.setItem('accessToken', state.accessToken);
      router.push('/orders');
}
  }, [state.accessToken, router]);

  return (
    <div>
      <LoginComponent formAction={formAction}
                      formErrors={formErrors}
                      setFormErrors={setFormErrors}
                      errorMessage={state.error}/>

    </div>
  );
}

export default LoginPage;