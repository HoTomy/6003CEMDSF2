import React from "react";
import { Form, Input, Button, Space, message } from 'antd';
import axios from "axios";
import { api } from './common/http-common';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Buffer } from 'buffer';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFormSubmit = (values: any) => {
    const username = values.username;
    const password = values.password;
    console.log(values, username, password);

    axios.get(`${api.uri}/user`)
      .then((res) => {
        const users = res.data;
        const foundUser = users.find((user: any) => user.username === username && user.password === password);
        if (foundUser) {
          const access_token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
          localStorage.setItem('atoken', access_token);
          localStorage.setItem('user', JSON.stringify(foundUser));
          const redirectTo = foundUser.staff === 'T' ? '/Dogs2' : '/Dogs3';
          navigate(redirectTo, { state: { username: foundUser.username, email: foundUser.email } });
        } else {
          message.error('Invalid username or password.');
        }
      })
      .catch((error) => {
        message.error('An error occurred. Please try again.');
        //navigate('/ApplicationForm', { replace: true });
      });
  };
  
  const onReset = () => {
    window.location.reload();
  };

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={(values) => handleFormSubmit(values)}
    >
      
      <br /><br /><br />
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: 'Please input your username!' },
          { min: 6, message: 'Username must be minimum 6 characters.' },
          { max: 16, message: 'Maximum 16 characters.' },
        ]}
      >
        <Input style={{ width: 400 }} />
        
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your username!' },
          { min: 6, message: 'Password must be minimum 6 characters.' },
          { max: 32, message: 'Maximum 32 characters.' },
        ]}
      >
        <Input.Password style={{ width: 400 }} />
        
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space wrap>
          <Button type="primary" htmlType="submit" style={{ width: 195 }}>
            Submit
          </Button>
          <Button type="primary" onClick={onReset} style={{ width: 195 }} danger>
            Reset
          </Button>
        </Space>
      </Form.Item>
      <hr />
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" style={{ width: 400 }}>
          <Link to={`/Register`}>Register</Link>
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" style={{ width: 400 }}>
          <Link to={`/Public`}>Public User</Link>
        </Button>
      </Form.Item>
    </Form>
  );
};



export default Login;