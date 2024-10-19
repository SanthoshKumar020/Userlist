import React, { useState, useEffect } from 'react';

interface User {
  first_name: string;
  last_name: string;
  username: string;
  age: number;
  marital_status: string;
  is_employed: boolean;
  is_founder: boolean;
}

interface UserFormProps {
  addUser: (user: User) => void;
  editUser: (user: User) => void;
  editingUser: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ addUser, editUser, editingUser }) => {
  const [user, setUser] = useState<User>({
    first_name: '',
    last_name: '',
    username: '',
    age: 0,
    marital_status: 'Single', // default value
    is_employed: false,
    is_founder: false
  });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({
        first_name: '',
        last_name: '',
        username: '',
        age: 0,
        marital_status: 'Single',
        is_employed: false,
        is_founder: false
      });
    }
  }, [editingUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      editUser(user);
    } else {
      addUser({ ...user, username: Date.now().toString() });
    }
    setUser({
      first_name: '',
      last_name: '',
      username: '',
      age: 0,
      marital_status: 'Single',
      is_employed: false,
      is_founder: false
    });
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          placeholder="First Name"
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
          disabled={!!editingUser}
        />
        <input
          type="number"
          placeholder="Age"
          value={user.age}
          onChange={(e) => setUser({ ...user, age: parseInt(e.target.value) })}
          required
        />
        <select
          value={user.marital_status}
          onChange={(e) => setUser({ ...user, marital_status: e.target.value })}
          required
        >
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>
        <label>
          Employed:
          <input
            type="checkbox"
            checked={user.is_employed}
            onChange={(e) => setUser({ ...user, is_employed: e.target.checked })}
          />
        </label>
        <label>
          Founder:
          <input
            type="checkbox"
            checked={user.is_founder}
            onChange={(e) => setUser({ ...user, is_founder: e.target.checked })}
          />
        </label>
        <button type="submit">{editingUser ? 'Update' : 'Add'} User</button>
      </form>
    </div>
  );
};

export default UserForm;
