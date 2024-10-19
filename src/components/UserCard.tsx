import React from 'react';

interface User {
  first_name: string;
  last_name: string;
  username: string;
  age: number;
  marital_status: string;
  is_employed: boolean;
  is_founder: boolean;
}

interface UserCardProps {
  user: User;
  deleteUser: (username: string) => void;
  setEditingUser: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, deleteUser, setEditingUser }) => {
  return (
    <div className="user-card">
      <h3>{user.first_name} {user.last_name}</h3>
      <p>Username: {user.username}</p>
      <p>Age: {user.age}</p>
      <p>Marital Status: {user.marital_status}</p>
      <p>Employed: {user.is_employed ? 'Yes' : 'No'}</p>
      <p>Founder: {user.is_founder ? 'Yes' : 'No'}</p>
      <button onClick={() => setEditingUser(user)}>Edit</button>
      <button onClick={() => deleteUser(user.username)}>Delete</button>
    </div>
  );
};

export default UserCard;
