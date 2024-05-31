import React from "react";
import { DatePicker, Select, Form, Input, Button, Space, message } from 'antd';
import axios from "axios";
import { api } from './common/http-common';

const { TextArea } = Input;
const { Option } = Select;

const NewDog = () => {

  const handleFormSubmit = (values) => {
    const id = values.id;
    const name = values.name;
    const breeds = values.breeds;
    const gender = values.gender;
    const birth = values.birth ? values.birth.format('YYYY-MM-DD') : undefined; // Format the date as 'YYYY-MM-DD'
    const centre = values.centre;
    const imageurl = values.imageurl;
    const remark = values.remark;
    const status = values.status;
    console.log(values, id, name, breeds, gender, birth, centre, imageurl, remark, status);
    const postDog = {
      id: id,
      name: name,
      breeds: breeds,
      gender: gender,
      birth: birth,
      centre: centre,
      imageurl: imageurl,
      remark: remark,
      status: status
    }

    // Post request
    axios.post(`${api.uri}/dogs`, postDog, {
      headers: {
        'Authorization': `Basic ${localStorage.getItem('atoken')}`,
      }
    }).then((res) => {
      console.log(res.data);
    });

    message.success('Add dog successful');
  }

  const contentRules = [
    { required: true, message: 'Please input something' }
  ];

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onReset = () => {
    window.location.reload();
  };

  return (
    <Form name="dog" labelCol={{ span: 2 }} onFinish={handleFormSubmit}>
      <br />
      <br />
      <Form.Item name="id" label="ID" rules={contentRules}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Dog Name" rules={contentRules}>
        <Input />
      </Form.Item>
      <Form.Item name="breeds" label="Breed" rules={contentRules}>
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={contentRules}>
        <Select
          placeholder="Select Gender"
          allowClear
        >
          <Option value="M">M - Male</Option>
          <Option value="F">F - Female</Option>
        </Select>
      </Form.Item>
      <Form.Item name="birth" label="Birth" rules={contentRules}>
        <DatePicker onChange={onChange} />
      </Form.Item>
      <Form.Item name="centre" label="Centre" rules={contentRules}>
        <Select
          placeholder="Select a centre"
          allowClear
        >
          <Option value="HK">Hong Kong Centre</Option>
          <Option value="KL">Kowloon Centre </Option>
          <Option value="NT">New Territories Centre</Option>
        </Select>
      </Form.Item>
      <Form.Item name="imageurl" label="Dog Photo Link" rules={contentRules}>
        <Input />
      </Form.Item>
      <Form.Item name="remark" label="Remark" >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="status" label="Status" rules={contentRules}>
        <Select
          placeholder="Select Status"
          allowClear
        >
          <Option value="Available">Available</Option>
          <Option value="Adopted">Adopted</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Space wrap>
          <Button type="primary" htmlType="submit" > Add </Button>
          <Button type="primary" htmlType="reset" onClick={onReset} danger> Reset </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default NewDog;