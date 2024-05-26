import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Image, Space, Button, Select, Input } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';


const { Option } = Select;

const Dog3 = () => {
  const [dogs, setDogs] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [breedFilter, setBreedFilter] = React.useState('');
  const [genderFilter, setGenderFilter] = React.useState('');
  const [centerFilter, setCenterFilter] = React.useState('');

  React.useEffect(() => {
    axios.get(`${api.uri}/dogs`)
      .then((res) => {
        setDogs(res.data);
      })
      .then(() => {
        setLoading(false);
      });
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

  const filteredDogs = dogs?.filter((dog) =>
    dog.breeds.toLowerCase().includes(breedFilter.toLowerCase()) &&
    (genderFilter === '' || dog.gender.toLowerCase() === genderFilter.toLowerCase()) &&
    (centerFilter === '' || dog.centre.toLowerCase() === centerFilter.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  } else {
    if (!dogs) {
      return <div>There are no dogs available now.</div>;
    } else {
      return (
        <div>
          <div>


            <Select
              value={genderFilter}
              onChange={handleGenderFilterChange}
              placeholder="Filter by gender"
              style={{ width: 200, marginRight: 10 }}
            >
              <Option value="">Gender</Option>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
            <Select
              value={centerFilter}
              onChange={handleCenterFilterChange}
              placeholder="Filter by center"
              style={{ width: 200 }}
            >
              <Option value="">Centre</Option>
              <Option value="HK">HK</Option>
              <Option value="KL">KL</Option>
              <Option value="NT">NT</Option>
            </Select>

            <Input
              value={breedFilter}
              onChange={(e) => setBreedFilter(e.target.value)}
              placeholder="Filter by breed"
            />

          </div>
          <Row>
            {filteredDogs.length === 0 ? (
              <div>No dogs match the filter criteria.</div>
            ) : (
              filteredDogs.map(({ id, name, breeds, gender, centre, imageurl, birth, remark, status}) => (
                <Col span={8} key={id}>
                  <Card title={name} style={{ width: 400, height: 600 }}>
                    <Button type="primary">
                      <Link to={"/ApplicationForm"}>Apply for Adoption</Link>
                    </Button>
                    <p></p>
                    <Image width={300} height={300} src={imageurl} />

                    
                    <pre>ID:  {id}    Centre:  {centre}    Gender:  {gender}</pre>
                    <pre>Birth:  {birth}    Status:  {status}</pre>
                    <pre>Breed:  {breeds}</pre>
                    <pre>Remark:  {remark}</pre>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </div>
      );
    }
  }
};

export default Dog3;