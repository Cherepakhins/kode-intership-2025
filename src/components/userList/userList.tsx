import React, { useEffect, useState } from "react";
import { fetchAllUsers, fetchUsersByDepartment } from "../../api/users";

interface UserListProps {
  searchQuery: string;
  department: string;
  sortType: "alphabet" | "birthday";
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  userTag: string;
  department: string;
}

const UserList: React.FC<UserListProps> = ({
  searchQuery,
  department,
  sortType,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data =
          department === "all"
            ? await fetchAllUsers()
            : await fetchUsersByDepartment(department);
        setUsers(data.items);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    loadUsers();
  }, [department]);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return (
      fullName.includes(query) || user.userTag.toLowerCase().includes(query)
    );
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortType === "alphabet") {
      return a.firstName.localeCompare(b.firstName);
    } else {
      return 0;
    }
  });

  return (
    <div>
      <ul>
        {sortedUsers.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.userTag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
