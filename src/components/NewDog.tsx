import React, { useState } from "react";
import type { DatePickerProps } from 'antd';
import { DatePicker, Select, Form, Input, Button, Upload, Space, message } from 'antd';
import { Buffer } from 'buffer';
import axios from "axios";
import { api } from './common/http-common';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const { TextArea } = Input
const { Option } = Select

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const NewDog = () => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {

    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }

    console.log(imageUrl);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleFormSubmit = (values: any) => {
    const name = values.name;
    const breeds = values.breeds;
    const gender = values.gender;
    const birth = values.birth;
    const centre = values.centre;
    const imageurl = Object.values({ imageUrl }).toString('base64');
    const remark = values.remark;
    const status = values.status;
    console.log(imageurl);
    console.log(values, name, breeds, gender, birth, centre, imageurl, remark, status);
    const postDog = {
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

    message.success('Add dog successful')
  }

  const contentRules = [
    { required: true, message: 'Please input somethings' }
  ]

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onReset = () => {
    window.location.reload();
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


  return (
    <Form name="dog" labelCol={{ span: 2 }} onFinish={(values) => handleFormSubmit(values)}>
      <br />
      <br />
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
      <Form.Item name="imageurl" label="Dog Photo" valuePropName="fileList" getValueFromEvent={normFile}>
        <Upload
          listType="picture-card"
          showUploadList={false}
          action="https://jsonplaceholder.typicode.com/posts"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} style={{ width: '100%' }} /> : uploadButton}
        </Upload>
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
          <Option value="Not available">Not available</Option>
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
