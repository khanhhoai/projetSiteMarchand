import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productManage.css";

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching users");
        setLoading(false);
      });
  }, []);

  const handleRoleChange = (userId, newRole) => {
    axios
      .put(`http://localhost:5000/users/${userId}/role`, { role: newRole })
      .then((response) => {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
      })
      .catch((err) => {
        setError("Error updating user role");
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Manage Users</h1>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() => handleRoleChange(user.id, "seller")}
                  disabled={user.role === "seller"}
                >
                  Set as Seller
                </button>
                <button
                  onClick={() => handleRoleChange(user.id, "user")}
                  disabled={user.role === "user"}
                >
                  Set as User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
