import React, { FC, useState } from 'react';
import { CreateUserType } from '@/app/models/CreateUserType';
import styles from './CreateUserStyle.module.css';

type MyProps = {
  isOpen: boolean
  onClose: () => void
  onCreate: (user: { email: string, name: string, surname: string }) => void;
};

const CreateUserComponent:FC<MyProps> = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = useState<CreateUserType>({ email: '', name: '', surname: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onCreate(form);
    setForm({ email: '', name: '', surname: '' });
    onClose();
  }
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <label className={styles.field}>Email
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className={styles.input}/>
        </label>
        <label className={styles.field}>Name
          <input type="taxt" name="name" placeholder="Name" value={form.name} onChange={handleChange} className={styles.input}/>
        </label>
        <label className={styles.field}>Surname
          <input type="taxt" name="surname" placeholder="Surname" value={form.surname} onChange={handleChange} className={styles.input}/>
        </label>
      <div className={styles.actions}>
        <button onClick={onClose} className={styles.createButton}>CANCEL</button>
        <button onClick={handleSubmit} className={styles.createButton}>CREATE</button>
      </div>
    </div>
    </div>
  );
}

export default CreateUserComponent;