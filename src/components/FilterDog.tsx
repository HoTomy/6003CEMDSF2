
import React from "react";
import { Link } from 'react-router-dom';
import { Select, Form, Input, Button, Space, Card, Col, Row, Image } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';

const Filter = () => {
  const [form] = Form.useForm();

  const [dogs, setDogs] = React.useState(null);

  const handleFormSubmit = (values: any) => {
    const id = values.id;
    const name = values.name;
    const breeds = values.breeds;
    const gender = values.gender;
    const centre = values.centre;
    console.log(values, id, name, breeds, gender, centre);

    const postDog = {
      id: id,
      name: name,
      breeds: breeds,
      gender: gender,
      centre: centre
    }

    axios.post(`${api.uri}/filter`, postDog)
      .then((res)=> {
        setDogs(res.data);
        console.log(res.data);
    });

  }

  console.log(dogs);

  const onReset = () => {
    form.resetFields();
  };

  const onBack = () => {
    window.location.reload();
  };

  if(!dogs){
      return (
    <Form name="dog"  labelCol={{ span: 2 }} onFinish={(values)=>handleFormSubmit(values)}>
      <br/>
      <br/>
      <Form.Item name="id" label="Dog ID" >
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Dog Name" >
        <Input />
      </Form.Item>
      <Form.Item name="breeds" label="Breed" >
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender" >
        <Select
          placeholder="Select Gender"
          options={[
            {
              value: 'M',
              label: 'M - Male',
            },
            {
              value: 'F',
              label: 'F - Female',
            },
          ]}
          allowClear
        />
      </Form.Item>
      <Form.Item name="centre" label="Centre" >
        <Select
          placeholder="Select a centre"
          options={[
            {
              value: 'HK',
              label: 'Hong Kong Centre',
            },
            {
              value: 'KL',
              label: 'Kowloon Centre',
            },
            {
              value: 'NT',
              label: 'New Territories Centre',
            },
          ]}
          allowClear
        />
      </Form.Item>
      <Form.Item>
        <Space wrap>
          <Button type="primary" htmlType="submit" > Filter </Button>
          <Button type="primary" htmlType="reset" onClick={onReset} danger> Reset </Button>
        </Space>
      </Form.Item>
    </Form>
  )
  } else {
      return(
        <div>
          <p></p>
          <div align="right"><Button type="primary" onClick={onBack}> Back </Button></div>
          <p></p>
          <Row>
          {
            dogs && dogs.map(({id, name, breeds, gender, centre, imageurl})=> (
              <Col span={8} key={id}>
                <Card title={name} style={{width: 400}}>
                  <pre>ID:         {id}</pre>
                  <pre>Breed:      {breeds}</pre>
                  <pre>Gender:     {gender}</pre>
                  <pre>Centre:     {centre}</pre>
                  <Image width={300} height={300} src={imageurl} />
                  <p></p>
                  <Link to={`/a/${id}`}>Details</Link>
                </Card>
              </Col>
            ))
          }
        </Row>
      </div>
      )
  } 
}
export default Filter;
