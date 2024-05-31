import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button } from 'antd';
import { api } from './common/http-common';

const UserM = () => {
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api.uri}/user`);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteAccount = async (index) => {
    try {
      const userId = user[index].id;
      await axios.delete(`${api.uri}/user/${index}`);
      // Update the local state to remove the deleted user
      const updatedUsers = [...user];
      updatedUsers.splice(index, 1);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user account:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Row gutter={[16, 16]}>
          {user.map((user, index) => (
            <Col key={index} span={8}>
              <Card>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                {user.staff === 'T' && (
                  <p>
                    <span style={{ color: 'blue' }}>Staff</span>
                  </p>
                )}
                {user.staff === 'F' && (
                  <Button
                    type="primary"
                    danger
                    style={{ marginBottom: 10 }}
                    onClick={() => handleDeleteAccount(index)}
                  >
                    Delete Account
                  </Button>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default UserM;