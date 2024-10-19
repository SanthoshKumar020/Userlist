import React, { useState } from 'react';

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
  updateUser: (updatedUser: User) => void; // Function to update the user
}

const UserCard: React.FC<UserCardProps> = ({ user, deleteUser, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState<User>(user);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditableUser({
      ...editableUser,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUpdate = () => {
    updateUser(editableUser); // Update the user with the modified data
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="user-card">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="first_name"
            value={editableUser.first_name}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="last_name"
            value={editableUser.last_name}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="username"
            value={editableUser.username}
            onChange={handleEditChange}
            disabled // Disable the username input to prevent changes
          />
          <input
            type="number"
            name="age"
            value={editableUser.age}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="marital_status"
            value={editableUser.marital_status}
            onChange={handleEditChange}
          />
          <label>
            Employed:
            <input
              type="checkbox"
              name="is_employed"
              checked={editableUser.is_employed}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Founder:
            <input
              type="checkbox"
              name="is_founder"
              checked={editableUser.is_founder}
              onChange={handleEditChange}
            />
          </label>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{user.first_name} {user.last_name}</h3>
          <p>Username: {user.username}</p>
          <p>Age: {user.age}</p>
          <p>Marital Status: {user.marital_status}</p>
          <p>Employed: {user.is_employed ? 'Yes' : 'No'}</p>
          <p>Founder: {user.is_founder ? 'Yes' : 'No'}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteUser(user.username)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
