import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './components/UserCard';
import UserForm from './components/UserForm';
import './styles.css';

interface User {
  first_name: string;
  last_name: string;
  username: string;
  age: number;
  marital_status: string;
  is_employed: boolean;
  is_founder: boolean;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get('https://mocki.io/v1/a6a0fb6b-a84a-4934-b3f2-5c92cc77c44e')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const addUser = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  const deleteUser = (username: string) => {
    setUsers(users.filter(user => user.username !== username));
  };

  const editUser = (updatedUser: User) => {
    setUsers(users.map(user => (user.username === updatedUser.username ? updatedUser : user)));
    setEditingUser(null);
  };

  return (
    <div className="container">
      <h1>User List</h1>
      <UserForm addUser={addUser} editUser={editUser} editingUser={editingUser} />
      <div className="user-list">
        {users.map(user => (
          <UserCard
            key={user.username}
            user={user}
            deleteUser={deleteUser}
            setEditingUser={setEditingUser}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
