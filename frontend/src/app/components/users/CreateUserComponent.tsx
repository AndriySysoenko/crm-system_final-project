import React, { FC } from 'react';

type MyProps = {
  isOpen: boolean
  onClose: () => void
  onCreate: (user: { email: string, name: string, surname: string }) => void;
};

const CreateUserComponent:FC<MyProps> = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = React.useState({ email: '', name: '', surname: '' });

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
    <div>
      <div>
        <label>
          Email
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}  />
        </label>
        <label>
          Name
          <input type="taxt" name="name" placeholder="Name" value={form.name} onChange={handleChange}  />
        </label>
        <label>
          Surname
          <input type="taxt" name="surname" placeholder="Surname" value={form.surname} onChange={handleChange}  />
        </label>
      </div>
      <div>
        <button onClick={onClose}>Close</button>
        <button onClick={handleSubmit}>Create</button>
      </div>
    </div>
  );
}

export default CreateUserComponent;