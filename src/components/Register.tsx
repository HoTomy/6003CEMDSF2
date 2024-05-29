import React, { useState } from "react";
import { Select, Form, Input, Button, Space, message } from 'antd';
import axios from "axios";
import { api } from './common/http-common';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFormSubmit = (values: any) => {
    const username = values.username;
    const password = values.password;
    const email = values.email;
    const staff = values.staff;
    const sign_up_code = values.sign_up_code;
    console.log(values, username, password, email, staff, sign_up_code);

    if (staff == 'T' && sign_up_code == '227021171') {
      const postUser = {
        username: username,
        password: password,
        email: email,
        staff: 'T'
      }

      // Post request
      axios.post(`${api.uri}/user`, postUser)
        .then((res) => {
          console.log(res.data);
        });

      message.success('Register successful');
    } else if (staff == 'F') {
      const postUser = {
        username: username,
        password: password,
        email: email,
        staff: 'F'
      }
      // Post request
      axios.post(`${api.uri}/user`, postUser)
        .then((res) => {

          message.success('Register successful');
          console.log(res.data);
        });

    } else if (staff == 'T' && sign_up_code != '227021171') {
      message.error('Incorrect sign up code !');
    } else {

    }

  }

  const onReset = () => {
    window.location.reload();
  };


  return (
    <Form
      name="user" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
      initialValues={{ staff: 'F' }}
      onFinish={(values) => handleFormSubmit(values)}
    >
      <br /><br /><br />
      <Form.Item label="Username" name="username"
        rules={[{ required: true, message: 'Please input your username!' },
        { min: 6, message: 'Username must be minimum 6 characters.' },
        { max: 16, message: 'Maximum 16 characters.' },
        ]}
      >
        <Input style={{ width: 400 }} />
      </Form.Item>

      <Form.Item label="Password" name="password"
        rules={[{ required: true, message: 'Please input your username!' },
        { min: 6, message: 'Password must be minimum 6 characters.' },
        { max: 32, message: 'Maximum 32 characters.' },
        ]}
      >
        <Input.Password style={{ width: 400 }} />
      </Form.Item>

      <Form.Item label="Email" name="email"
        rules={[{ required: true, message: 'Please input your email!' },
        { max: 64, message: 'Maximum 64 characters.' },
        ]}
      >
        <Input style={{ width: 400 }} />
      </Form.Item>

      <Form.Item label="Staff" name="staff">
        <Select
          placeholder="Select ..."
          style={{ width: 400 }}
          options={[
            {
              value: 'F',
              label: 'No',
            },
            {
              value: 'T',
              label: 'Yes',
            }
          ]}
        />
      </Form.Item>

      <Form.Item label="Staff sign up code" name="sign_up_code">
        <Input style={{ width: 400 }} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space wrap>
          <Button type="primary" htmlType="submit" style={{ width: 195 }} >
            Submit
          </Button>
          <Button type="primary" onClick={onReset} style={{ width: 195 }} danger>
            Reset
          </Button>
        </Space>
      </Form.Item>
      <hr />
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" onClick={() => navigate(-1)} style={{ width: 400 }}>
          Back
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Register;
