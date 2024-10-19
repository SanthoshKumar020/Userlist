import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/Userlist';
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
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      setUsers(users.filter(user => user.username !== username));
    }
  };

  const updateUser = (updatedUser: User) => {
    setUsers(users.map(user => (user.username === updatedUser.username ? updatedUser : user)));
  };

  return (
    <div className="container">
      <h1>User List</h1>
      <UserForm addUser={addUser} editUser={function (user: User): void {
        throw new Error('Function not implemented.');
      } } editingUser={null} />
      <UserList users={users} deleteUser={deleteUser} updateUser={updateUser} />
    </div>
  );
};

export default App;
