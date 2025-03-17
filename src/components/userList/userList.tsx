import React, { useEffect, useState } from "react";
import {
  fetchAllUsers,
  fetchUsersByDepartment,
  fetchDynamicUsers,
  fetchError500,
} from "../../api/users";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const allUsers = await fetchAllUsers();
        setUsers(allUsers.items);
      } catch (err) {
        setError("Failed to fetch users");
      }
    };

    loadUsers();
  }, []);

  const handleDepartmentFetch = async (department: string) => {
    try {
      const departmentUsers = await fetchUsersByDepartment(department);
      setUsers(departmentUsers.items);
    } catch (err) {
      setError(`Failed to fetch users in ${department} department`);
    }
  };

  const handleDynamicFetch = async () => {
    try {
      const dynamicUsers = await fetchDynamicUsers();
      setUsers(dynamicUsers.items);
    } catch (err) {
      setError("Failed to fetch dynamic users");
    }
  };

  const handleErrorFetch = async () => {
    try {
      await fetchError500();
    } catch (err) {
      setError("Error 500 occurred");
    }
  };

  return (
    <div>
      <h1>User List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={() => handleDepartmentFetch("frontend")}>
        Fetch Frontend Users
      </button>
      <button onClick={handleDynamicFetch}>Fetch Dynamic Users</button>
      <button onClick={handleErrorFetch}>Trigger Error 500</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.userTag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
