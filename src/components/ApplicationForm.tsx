import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';

const ApplicationForm = () => {
  const location = useLocation();
  const { applicationData } = location.state;
  const { username, dogId, dogName, dogCenter, email, dogBreed, applicationDate } = applicationData;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState(getDefaultMessage());

  function getDefaultMessage() {
    return `Dear Sir/Madam,

I would like to adopt the dog with the following details:

Dog ID: ${dogId}

Dog Name: ${dogName}

Dog Breed: ${dogBreed}

Center: ${dogCenter}

Email Address: ${email}

Thank you.

${username}.`;
  }

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post('/api/v1/application', {
        dogId,
        dogName,
        dogCenter,
        username,
        email,
        dogBreed,
        applicationDate,
        message: editedMessage,
      });

      console.log('Application submitted successfully:', response.data);
      // Optionally, you can display a success message to the user or redirect to another page.
    } catch (error) {
      console.error('Failed to submit application:', error);
      // Handle the error condition, such as displaying an error message to the user.
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const handleSave = () => {
    setIsEditMode(false);
  };

  const handleInputChange = (e) => {
    setEditedMessage(e.target.value);
  };

  return (
    <div>
      <h2>Apply for Adoption</h2>
      <Card title="Application Details" style={{ width: 400 }}>
        <p>{applicationDate}</p>
        <pre>{editedMessage}</pre>
      </Card>
      {isEditMode ? (
        <Modal
          visible={true}
          title="Edit Application Message"
          onCancel={handleCancel}
          onOk={handleSave}
          okText="Save"
          cancelText="Cancel"
        >
          <Form>
            <Form.Item label="Message">
              <Input.TextArea
                value={editedMessage}
                onChange={handleInputChange}
                autoSize={{ minRows: 4, maxRows: 30 }} // Adjust the number of rows here
              />
            </Form.Item>
          </Form>
        </Modal>
      ) : (
        <Button type="primary" onClick={handleEditClick}>
          Edit
        </Button>    
      )}
      <Button type="primary" onClick={handleFormSubmit}>
        Send
      </Button>
    </div>
  );
};

export default ApplicationForm;