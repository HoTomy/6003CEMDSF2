import React from "react";
import { Buffer } from 'buffer';
import axios from "axios";
import { api } from './common/http-common';

import { useParams, useNavigate } from 'react-router-dom';
import { Card, Col, Row, Button } from 'antd';

const DeleteDog = () => {
  const { cid } = useParams();
  const navigate= useNavigate();
  console.log(cid);

    axios.delete(`${api.uri}/dogs/${cid}`, {
      headers: {
        'Authorization': `Basic ${localStorage.getItem('atoken')}`
      }
    }).then((res)=> {
      console.log(res.data);
    });

  return(
        <Row justify="center">
          {
              <Col>
                <Card title="Delete Successful !" style={{width: 700} }>
                  <p>ID : {cid} does not exixt</p>
                  <br/>
                  <br/>
                  <div align="right"><Button type="primary" onClick={()=>navigate(-1)}>Back</Button></div>
                </Card>
              </Col>
          }
        </Row>
      )
}

export default DeleteDog;
