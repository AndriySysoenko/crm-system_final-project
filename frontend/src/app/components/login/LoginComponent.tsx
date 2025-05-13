import React, { FC } from 'react';
import { loginSchema } from '@/app/validators/validationLogin';
import Form from 'next/form';
import { useFormStatus } from 'react-dom';
import styles from './LoginStyle.module.css';

type LoginErrors = {
  email?: string;
  password?: string;
};

type LoginProps = {
  formErrors: LoginErrors;
  setFormErrors: React.Dispatch<React.SetStateAction<LoginErrors>>;
  formAction: (formData: FormData) => void;
  errorMessage?: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={styles.button}>
      {pending ? 'Loading...' : 'Login'}
    </button>
  );
}

const LoginComponent:FC<LoginProps> = ({ formErrors, setFormErrors, formAction, errorMessage }) => {
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
    <div className={styles.main}>
      <Form action={customFormAction} className={styles.form}>
        <label >
          Email
          <input type="email" name="email" placeholder="Email" className={styles.input}/>
          {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
        </label>
        <label>
          Password
          <input type="password" name="password" placeholder="Password" className={styles.input}/>
          {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
        </label>
        <SubmitButton />
      </Form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default LoginComponent;