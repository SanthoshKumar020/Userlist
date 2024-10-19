import React, { useState } from 'react';
import UserCard from './UserCard';

interface User {
  first_name: string;
  last_name: string;
  username: string;
  age: number;
  marital_status: string;
  is_employed: boolean;
  is_founder: boolean;
}

interface UserListProps {
  users: User[];
  deleteUser: (username: string) => void;
  updateUser: (updatedUser: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, deleteUser, updateUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Number of users to display per page

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="user-list">
      <div className="user-cards">
        {currentUsers.map(user => (
          <UserCard
            key={user.username}
            user={user}
            deleteUser={deleteUser}
            updateUser={updateUser} // Pass the update function
          />
        ))}
      </div>
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
