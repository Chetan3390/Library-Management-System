import React, { useEffect, useState } from 'react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadUsers = async () => {
    try {
      const response = await fetch('http://localhost:9091/auth/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      alert("Error fetching users: " + error.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.roles && user.roles.toLowerCase().includes(searchQuery.toLowerCase())) ||
    user.id.toString().includes(searchQuery)
  );

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h4 className="card-title text-center">User Details</h4>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Users (ID, name, email, roles)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Roles</th>
                <th className="text-center">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="text-center">{user.id}</td>
                  <td className="text-center">{user.name}</td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">{user.roles}</td>
                  <td className="text-center">{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-primary" onClick={loadUsers}>
          Refresh Users
        </button>
      </div>
    </div>
  );
};

export default AdminUsers;
