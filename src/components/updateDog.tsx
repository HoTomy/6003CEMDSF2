import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Col, Row, Image, Button, Input } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';

const UpdateDog () => {
  const { uid } = useParams();
  const navigate = useNavigate();

  const [dogs, setDogs] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [editMode, setEditMode] = React.useState(false);
  const [editedDogs, setEditedDogs] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${api.uri}/dogs/${uid}`)
      .then((res) => {
        setDogs(res.data);
        setEditedDogs(res.data); // Initialize editedDogs with the fetched data
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDogs((prevDogs) => ({
      ...prevDogs,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Here you can send an API request to update the dog's data with editedDogs object
    // For example:
    // axios.put(`${api.uri}/dogs/${uid}`, editedDogs)
    //   .then((res) => {
    //     console.log('Dog updated successfully!');
    //     setDogs(res.data); // Update the dogs state with the updated data
    //     setEditMode(false); // Disable edit mode
    //   })
    //   .catch((error) => {
    //     console.error('Failed to update dog:', error);
    //   });
    // Note: The above code assumes you have an endpoint to handle the PUT request for updating a dog

    // For demonstration purposes, we'll only update the state without making an API request
    setDogs(editedDogs);
    setEditMode(false);
  };

  if (loading) {
    return <div>Loading ...</div>;
  } else {
    if (!dogs) {
      return <div>There is no dog available now.</div>;
    } else {
      const {
        id,
        name,
        breed,
        gender,
        birth,
        centre,
        remark,
        status,
        imageurl,
      } = dogs;

      return (
        <Row justify="center">
          <Col key={id}>
            <Card title={name} style={{ width: 700 }}>
              <pre>ID: {id}</pre>
              <pre>Breed: {breed}</pre>
              <pre>Gender: {gender}</pre>
              <pre>Birth: {birth ? birth : 'N/A'}</pre>
              <pre>
                Centre:{' '}
                {editMode ? (
                  <Input
                    name="centre"
                    value={editedDogs.centre}
                    onChange={handleInputChange}
                  />
                ) : (
                  centre
                )}
              </pre>
              <pre>
                Remark:{' '}
                {editMode ? editedDogs
                  <Input
                    name="remark"
                    value={editedDogs.remark}
                    onChange={handleInputChange}
                  />
                ) : (
                  remark
                )}
              </pre>
              <pre>
                Status:{' '}
                {editMode ? (
                  <Input
                    name="status"
                    value={editedDogs.status}
                    onChange={handleInputChange}
                  />
                ) : (
                  status
                )}
              </pre>
              <pre>
                <Image width={500} height={500} src={imageurl} />
              </pre>
              <br />
              <br />
              <div align="right">
                {editMode ? (
                  <Button type="primary" onClick={handleSaveChanges}>
                    Save
                  </Button>
                ) : (
                  <Button type="primary" onClick={toggleEditMode}>
                    Edit
                  </Button>
                )}
                <Button onClick={() => navigate(-1)}>Back</Button>
              </div>
            </Card>
          </Col>
        </Row>
      );
    }
  }
};

export default UpdateDog;