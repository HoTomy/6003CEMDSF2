import React, { useState } from "react";
import { Form, Input, Button, Space, message } from 'antd';
import axios from "axios";
import { api } from './common/http-common';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Buffer } from 'buffer';

const Login = () => {
  const navigate= useNavigate();

  const [user, setUser] = React.useState(null);

  const handleFormSubmit = (values: any) => {
    const username = values.username;
    const password = values.password;
    console.log(values, username, password);

    const access_token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
    localStorage.setItem('atoken', access_token);

    const postUser = {
      username: username,
      password: password
    }
      // Post request
    axios.post(`${api.uri}/login`, postUser)
      .then((res)=> {
      setUser(res.data);
      console.log(res.data);
      })

    if(!user){

    } else {
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/Home', { replace: true });
    }

  }

  const onReset = () => {
    window.location.reload();
  };

  return (
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} 
      onFinish={(values)=>handleFormSubmit(values)}
      >
      <br/><br/><br/>
      <Form.Item label="Username" name="username"
      rules={[{ required: true, message: 'Please input your username!' },
              { min: 6 , message: 'Username must be minimum 6 characters.' },
              { max: 16 , message: 'Maximum 16 characters.' },
             ]}
      >
      <Input style={{width: 400}} />
    </Form.Item>

      <Form.Item label="Password" name="password"
      rules={[{ required: true, message: 'Please input your username!' },
              { min: 6 , message: 'Password must be minimum 6 characters.' },
              { max: 32 , message: 'Maximum 32 characters.' },
             ]}
      >
      <Input.Password style={{width: 400}} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 } }>
        <Space wrap>
          <Button type="primary" htmlType="submit" style={{width: 195}} >
          Submit
          </Button>
          <Button type="primary" onClick = {onReset} style={{width: 195}} danger>
          Reset
          </Button>
        </Space>
      </Form.Item>
        <hr/>
      <Form.Item wrapperCol={{ offset: 8, span: 16 } }>
          <Button type="primary" style={{width: 400}} >
           <Link to={`/Register`}>Register</Link>
          </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 } }>
          <Button type="primary" style={{width: 400}} >
           <Link to={`/Public`}>Public User</Link>
          </Button>
      </Form.Item>
    </Form>
  )
}

export default Login;
