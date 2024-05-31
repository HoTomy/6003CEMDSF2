import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Space, Button } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';

const ApplM = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${api.uri}/application`);
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleAccept = async (applicationIndex) => {
    try {
      const application = applications[applicationIndex];

      // Fetch the current dog information
      const dogResponse = await axios.get(`${api.uri}/dogs/${application.dogId}`);
      const dog = dogResponse.data;

      // Update the dog's status to "Adopted"
      dog.status = 'Adopted';

      // Send the updated dog information to the backend
      await axios.put(`${api.uri}/dogs/${application.dogId}`, dog);

      // Delete the accepted application from the backend
      await axios.delete(`${api.uri}/application/${applicationIndex + 1}`);

      // Update the local state to remove the accepted application
      const updatedApplications = [...applications];
      updatedApplications.splice(applicationIndex, 1);
      setApplications(updatedApplications);
    } catch (error) {
      console.error('Error accepting application:', error);
    }
  };

  const handleCancel = async (index) => {
    try {
      await axios.delete(`${api.uri}/application/${index + 1}`);
      const updatedApplications = [...applications];
      updatedApplications.splice(index, 1);
      setApplications(updatedApplications);
    } catch (error) {
      console.error('Error canceling application:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Row gutter={[16, 16]}>
          {applications.map((application, index) => (
            <Col key={index} span={8}>
              <Card>
                <p>Application Date: {application.applicationDate}</p>
                <p>Username: {application.username}</p>
                <p>Email: {application.email}</p>
                <p>Dog ID: {application.dogId}</p>
                <p>____________________________</p>
                <p>Message:</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: application.message.replace(/\n/g, '<br />'),
                  }}
                />
                <Space>
                  <Button
                    type="primary"
                    style={{ marginBottom: 10 }}
                    onClick={() => handleAccept(index)}
                  >
                    Accept
                  </Button>
                  <Button
                    type="primary"
                    danger
                    style={{ marginBottom: 10 }}
                    onClick={() => handleCancel(index)}
                  >
                    Cancel
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ApplM;