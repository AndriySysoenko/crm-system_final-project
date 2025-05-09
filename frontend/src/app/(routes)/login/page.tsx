'use client';

import React, { useActionState, useEffect, useState } from 'react';
import Form from 'next/form';
import { loginAction } from '@/app/service/api.service';
import { useFormStatus } from 'react-dom';
import { error } from 'next/dist/build/output/log';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/app/validators/validationLogin';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Loading...' : 'Login'}
    </button>
  );
}

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

  const handleClientValidation = (formData: FormData) => {
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const { error } = loginSchema.validate(data, { abortEarly: false });

    if (error) {
      const errors: { email?: string; password?: string } = {};
      error.details.forEach((err) => {
        const field = err.path[0];
        if (field === 'email' || field === 'password') {
          errors[field] = err.message;
        }
      });

      setFormErrors(errors);
      return false;
    }

    setFormErrors({});
    return true;
  };

  const customFormAction = async (formData: FormData) => {
    const isValid = handleClientValidation(formData);
    if (isValid) {
      await formAction(formData);
    }
  };

  return (
    <div>
      <Form action={customFormAction}>
        <label>
          Email
          <input type="email" name="email" placeholder="Email" />
          {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
        </label>
        <label>
          Password
          <input type="password" name="password" placeholder="Password" />
          {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
        </label>
        <SubmitButton />
      </Form>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
    </div>
  );
}

export default LoginPage;