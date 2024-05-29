import React, { useEffect } from "react";
import axios from "axios";
import { api } from './common/http-common';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Col, Row, Button } from 'antd';

const DeleteDog = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    axios.delete(`${api.uri}/dogs/${id}`, {
      headers: {
        'Authorization': `Basic ${localStorage.getItem('atoken')}`
      }
    }).then((res) => {
      console.log(res.data);
    });
  }, );

  return (
    <Row justify="center">
      <Col>
        <Card title="Delete Successful!" style={{ width: 700 }}>
          <p>Dog ID: {id} Delete Successful!</p>
          <br />
          <br />
          <div align="right"><Button type="primary" onClick={() => navigate(-1)}>Back</Button></div>
        </Card>
      </Col>
    </Row>
  );
}

export default DeleteDog;