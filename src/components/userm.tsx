import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from './common/http-common';

const UserM = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${api.uri}/user`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api.uri}/user/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const staffUsers = users.filter((user) => user.staff === 'T');
  const nonStaffUsers = users.filter((user) => user.staff === 'F');

  return (
    <div>
      <h1>User Management</h1>

      <h2>Staff Users</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '70px' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left' }}>Username</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {staffUsers.map((user, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{user.username}</td>
              <td style={{ padding: '10px' }}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Non-Staff Users</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left' }}>Username</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {nonStaffUsers.map((user, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{user.username}</td>
              <td style={{ padding: '10px' }}>{user.email}</td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserM;