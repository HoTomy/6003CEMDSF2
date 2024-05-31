import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, Col, Row, Image, Space, Button, Select, Input } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';

const { Option } = Select;

const Dog2 = () => {
  const location = useLocation();
  const { username, email } = location.state;
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breedFilter, setBreedFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [centerFilter, setCenterFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get(`${api.uri}/dogs`);
        setDogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dogs:', error);
        setLoading(false);
      }
    };
    fetchDogs();
  }, []);

  const handleBreedFilterChange = (value) => {
    setBreedFilter(value);
  };

  const handleGenderFilterChange = (value) => {
    setGenderFilter(value);
  };

  const handleCenterFilterChange = (value) => {
    setCenterFilter(value);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
  };

  const filteredDogs = dogs.filter(
    (dog) =>
      dog.breeds.toLowerCase().includes(breedFilter.toLowerCase()) &&
      (genderFilter === '' || dog.gender.toLowerCase() === genderFilter.toLowerCase()) &&
      (centerFilter === '' || dog.centre.toLowerCase() === centerFilter.toLowerCase()) &&
      (statusFilter === '' || dog.status.toLowerCase() === statusFilter.toLowerCase())
  );

  return (
    <div>
      <div>
        <h2>Welcome, {username}!</h2>
        <p>Your email: {email}</p>
        <Select
          value={genderFilter}
          onChange={handleGenderFilterChange}
          placeholder="Filter by gender"
          style={{ width: 200, marginRight: 10 }}
        >
          <Option value="">Gender-ALL</Option>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
        <Select
          value={centerFilter}
          onChange={handleCenterFilterChange}
          placeholder="Filter by center"
          style={{ width: 200, marginRight: 10 }}
        >
          <Option value="">Centre-ALL</Option>
          <Option value="HK">HK</Option>
          <Option value="KL">KL</Option>
          <Option value="NT">NT</Option>
        </Select>
        <Select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          placeholder="Filter by status"
          style={{ width: 200, marginRight: 10 }}
        >
          <Option value="">Status-ALL</Option>
          <Option value="available">Available</Option>
          <Option value="adopted">Adopted</Option>
        </Select>
        <Space>
        <Button type="primary" style={{ marginBottom: 10 }}>
          <Link to="/newdog">Add a New Dog</Link>
        </Button>
        <Button type="primary" danger style={{ marginBottom: 10 }}>
          <Link to="/userm">Manage User Account</Link>
        </Button>
        <Button type="primary" danger style={{ marginBottom: 10 }}>
          <Link to="/applm">Manage Application</Link>
        </Button>
        </Space>
        <Input
          value={breedFilter}
          onChange={(e) => setBreedFilter(e.target.value)}
          placeholder="Filter by breed"
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : filteredDogs.length === 0 ? (
        <div>No dogs match the filter criteria.</div>
      ) : (
        <Row gutter={[16, 16]}>
          {filteredDogs.map(
            ({ id, name, breeds, gender, centre, imageurl, birth, remark, status }) => (
              <Col key={id} xs={24} sm={12} md={8}>
                <Card title={name} style={{ height: '100%' }}>
                  <Image width={300} height={300} src={imageurl} />
                  <p></p>
                  <Space wrap>
                    <Button type="primary">
                      <Link to={`/detailDog/${id}`}>Update</Link>
                    </Button>
                    <Button type="primary" danger>
                      <Link to={`/deleteDog/${id}`}>Delete</Link>
                    </Button>
                  </Space>
                  <div>
                    <p>ID: {id}</p>
                    <p>Centre: {centre}</p>
                    <p>Gender: {gender}</p>
                    <p>Birth: {birth}</p>
                    <p>Status: {status}</p>
                    <p>Breed: {breeds}</p>
                    <p>Remark: {remark}</p>
                  </div>
                </Card>
              </Col>
            )
          )}
        </Row>
      )}
    </div>
  );
};

export default Dog2;