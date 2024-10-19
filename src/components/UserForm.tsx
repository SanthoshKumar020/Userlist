import React, { useEffect, useState } from 'react';

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
    marital_status: '',
    is_employed: false,
    is_founder: false,
  });

  const [error, setError] = useState<string | null>(null); // State for error message

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({
        first_name: '',
        last_name: '',
        username: '',
        age: 0,
        marital_status: '',
        is_employed: false,
        is_founder: false,
      });
    }
  }, [editingUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation check
    if (!user.first_name || !user.last_name || !user.username || !user.marital_status || user.age <= 0) {
      setError('Please fill in all fields correctly.');
      return;
    } else {
      setError(null); // Clear error if validation passes
    }

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
      marital_status: '',
      is_employed: false,
      is_founder: false,
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
        <label htmlFor="marital_status">Marital Status</label>
        <select
          id="marital_status"
          value={user.marital_status}
          onChange={(e) => setUser({ ...user, marital_status: e.target.value })}
          required
        >
          <option value="" disabled>Select Marital Status</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
          <option value="widowed">Widowed</option>
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
        {error && <p className="error-message">{error}</p>} {/* Error message display */}
      </form>
    </div>
  );
};

export default UserForm;
