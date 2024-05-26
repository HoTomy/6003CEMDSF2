import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Image, Space, Button } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';


const DogList = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${api.uri}/dogs`)
      .then((res) => {
        setDogs(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);


  
  if (loading) {
    return <div>Loading ...</div>;
  } else {
    if (!dogs || dogs.length === 0) {
      return <div>There is no dog available now.</div>;
    } else {
      return (
        <div>
          <br />
          <Space wrap>
            <Button type="primary" style={{ width: 150 }} danger>
              Logout
            </Button>
          </Space>
          <br />
          <hr />
          <br />

          <Row>
            {dogs.map(({ id, name, breeds, gender, centre, imageurl }) => (
              <Col span={8} key={id}>
                <Card title={name} style={{ width: 400 }}>
                  <pre>ID:         {id}</pre>
                  <pre>Breed:      {breeds}</pre>
                  <pre>Gender:     {gender}</pre>
                  <pre>Centre:     {centre}</pre>
                  <Image width={300} height={300} src={imageurl} />
                  <p></p>
                  <Link to={`/a/${id}`}>Details</Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      );
    }
  }
};

export default DogList;