import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Col, Row, Image, Button, Input, Select } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';

const { Option } = Select;

const DetailDog = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = React.useState(false);
  const [editedRemark, setEditedRemark] = React.useState('');
  const [editedCentre, setEditedCentre] = React.useState('');
  const [editedStatus, setEditedStatus] = React.useState('');

  const [dog, setDog] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get(`${api.uri}/dogs/${uid}`)
      .then((res) => {
        console.log(res.data); // Check the response from the API
        setDog(res.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error); // Log any error that occurred
      });
  }, [uid]);

  React.useEffect(() => {
    if (dog) {
      const intervalId = setInterval(() => {
        axios.get(`${api.uri}/dogs/${uid}`)
          .then((res) => {
            console.log(res.data); // Check the response from the API
            setDog(res.data);
          })
          .catch((error) => {
            console.log(error); // Log any error that occurred
          });
      }, 500); // Refresh every 5 seconds (adjust the interval as needed)

      return () => {
        clearInterval(intervalId); // Clear the interval when the component unmounts
      };
    }
  }, [dog, uid]);

  const toggleEditability = () => {
    if (isEditable) {
      // Prepare the data for the PUT request
      const updatedDog = {
        ...dog,
        remark: editedRemark,
        centre: editedCentre,
        status: editedStatus,
      };

      // Send the PUT request to update the data
      axios.put(`${api.uri}/dogs/${uid}`, updatedDog)
        .then((res) => {
          console.log(res.data); // Check the response from the API
          setDog(res.data);
          setIsEditable(false);
        })
        .catch((error) => {
          console.log(error); // Log any error that occurred
        });
    } else {
      setIsEditable(true);
    }
  };

  const handleRemarkChange = (e) => {
    setEditedRemark(e.target.value);
  };

  const handleCentreChange = (value) => {
    setEditedCentre(value);
  };

  const handleStatusChange = (value) => {
    setEditedStatus(value);
  };

  if (loading) {
    return <div>Loading ...</div>;
  } else {
    if (!dog) {
      return <div>There is no dog available now.</div>;
    } else {
      const {
        id,
        name,
        breeds,
        gender,
        birth,
        centre,
        remark,
        status,
        imageurl,
      } = dog;

      return (
        <Row justify="center">
          <Col key={id}>
            <Card style={{ width: 700 }}>
              <Card.Meta title={<Input value={name} />} />
              <pre>ID: {id}</pre>
              <pre>Breed: {breeds}</pre>
              <pre>Gender: {gender}</pre>
              <pre>Birth: {birth ? birth : 'N/A'}</pre>
              <pre>
                Centre:{' '}
                {isEditable ? (
                  <Select value={editedCentre} onChange={handleCentreChange} style={{ width: 200, marginRight: 10 }}>
                    <Option value="HK">HK</Option>
                    <Option value="KL">KL</Option>
                    <Option value="NT">NT</Option>
                  </Select>
                ) : (
                  centre
                )}
              </pre>
              <pre>
                Remark:{' '}
                {isEditable ? (
                  <Input value={editedRemark} onChange={handleRemarkChange} />
                ) : (
                  remark
                )}
              </pre>
              <pre>
                Status:{' '}
                {isEditable ? (
                  <Select value={editedStatus} onChange={handleStatusChange} style={{ width: 200, marginRight: 10 }}>
                    <Option value="Available">Available</Option>
                    <Option value="Adopted">Adopted</Option>
                  </Select>
                ) : (
                  status
                )}
              </pre>
              <div align="right">
                {isEditable ? (
                  <Button type="primary" danger onClick={toggleEditability}>
                    Save
                  </Button>
                ) : (
                  <Button type="primary" onClick={toggleEditability}>
                    Edit
                  </Button>
                )}
              </div>
              <pre>
                <Image width={500} height={500} src={imageurl} />
              </pre>
              <br />
              <br />
              <div align="right">
                <Button type="primary" onClick={() => navigate(-1)}>Back</Button>
              </div>
            </Card>
          </Col>
        </Row>
      );
    }
  }
};

export default DetailDog;