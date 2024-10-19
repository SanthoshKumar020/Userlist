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
  setEditingUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, deleteUser, setEditingUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Number of users per page

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="user-list">
        {currentUsers.map(user => (
          <UserCard
            key={user.username}
            user={user}
            deleteUser={deleteUser}
            setEditingUser={setEditingUser}
          />
        ))}
      </div>
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination: React.FC<{ usersPerPage: number; totalUsers: number; paginate: (pageNumber: number) => void }> = ({
  usersPerPage,
  totalUsers,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserList;
