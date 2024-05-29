import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Col, Row, Image, Button } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';

const DetailDog = () => {
  const {uid} = useParams();
  const navigate= useNavigate();

  const [dogs, setDogs] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(()=>{
    axios.get(`${api.uri}/dogs/${uid}`)
      .then((res)=>{
        setDogs(res.data);
      })
      .then(()=>{
        setLoading(false);
      })
  }, []);

  if(loading){

    return(<div>Loading ...</div>)

  } else {
    if(!dogs){
      return(<div>There is no dog available now.</div>)
    } else {
      let birthday = [dogs.birth];

      if ( birthday[0] == null ){
        return(
        <Row justify="center">
          {
              <Col key={dogs.id}>
                <Card title={dogs.name} style={{width: 700} }>
                  <pre>       ID:         {dogs.id}</pre>
                  <pre>       Breed:      {dogs.breed}</pre>
                  <pre>       Gender:     {dogs.gender}</pre>
                  <pre>       Birth:      N\A </pre>
                  <pre>       Centre:     {dogs.centre}</pre>
                  <pre>       Remark:     {dogs.remark}</pre>
                  <pre>       Status:     {dogs.status}</pre>
                  <pre>       <Image width={500} height={500} src={dogs.imageurl} /></pre>
                  <br/>
                  <br/>
                  <div align="right"><Button type="primary" onClick={()=>navigate(-1)}>Back</Button></div>
                </Card>
              </Col>
          }
        </Row>
      )
      } else {
        return(
        <Row justify="center">
          {
              <Col key={dogs.id}>
                <Card title={name} style={{width: 700} }>
                  <pre>       ID:         {dogs.id}</pre>
                  <pre>       Name:       {dogs.name}</pre>
                  <pre>       Breed:      {dogs.breeds}</pre>
                  <pre>       Gender:     {dogs.gender}</pre>
                  <pre>       Birth:      {dogs.birth} </pre>
                  <pre>       Centre:     {dogs.centre}</pre>
                  <pre>       Remark:     {dogs.remark}</pre>
                  <pre>       Status:     {dogs.status}</pre>
                  <pre>       <Image width={500} height={500} src={dogs.imageurl} /></pre>
                  <br/>
                  <br/>
                  <div align="right"><Button type="primary" onClick={()=>navigate(-1)}>Back</Button></div>
                </Card>
              </Col>
          }
        </Row>
      )
      }
    }
  }
}

export default DetailDog;