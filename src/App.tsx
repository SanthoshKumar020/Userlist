import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from './components/Userlist';
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

  // Fetch users from the API
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
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.username !== username));
    }
  };

  const editUser = (updatedUser: User) => {
    setUsers(users.map(user => (user.username === updatedUser.username ? updatedUser : user)));
    setEditingUser(null);
  };

  return (
    <div className="container">
      <h1>User List</h1>
      <UserForm addUser={addUser} editUser={editUser} editingUser={editingUser} />
      <UserList users={users} deleteUser={deleteUser} setEditingUser={setEditingUser} />
    </div>
  );
};

export default App;
