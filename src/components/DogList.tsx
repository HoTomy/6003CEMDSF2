import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from './common/http-common';
import { Link } from 'react-router-dom';

function DogList() {
  const [dogs, setDogs] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [filters, setFilters] = useState({
    breed: '',
    sex: '',
    centre: '',
    status: '',
  });

  useEffect(() => {
    // Fetch the list of dogs from the API
    const fetchDogs = async () => {
      try {
        const response = await axios.get(`${api.uri}/dog`);
        setDogs(response.data);
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };

    fetchDogs();
  }, []);

  // Update the filtered dogs based on the selected filters
  useEffect(() => {
    const { breed, sex, centre, status } = filters;
    let filteredDogs = dogs;

    if (breed) {
      filteredDogs = filteredDogs.filter((dog) => dog.breeds === breed);
    }
    if (sex) {
      filteredDogs = filteredDogs.filter((dog) => dog.sex === sex);
    }
    if (centre) {
      filteredDogs = filteredDogs.filter((dog) => dog.center === centre);
    }
    if (status) {
      filteredDogs = filteredDogs.filter((dog) => dog.status === status);
    }

    setFilteredDogs(filteredDogs);
  }, [dogs, filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div>
      <h2>Dog List</h2>

      <div>
        <label>
          Breed:
          <input
            type="text"
            name="breed"
            value={filters.breed}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Sex:
          <input
            type="text"
            name="sex"
            value={filters.sex}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Centre:
          <input
            type="text"
            name="centre"
            value={filters.centre}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          />
        </label>
      </div>

      {filteredDogs.length === 0 ? (
        <p>No dogs available</p>
      ) : (
        <ul>
          {filteredDogs.map((dog) => (
            <li key={dog.id}>
              <Link to={`/dogs/${dog.id}`}>
                <h3>{dog.name}</h3>
              </Link>
              <p>{dog.breeds}</p>
              <p>Center: {dog.center}</p>
              <p>Status: {dog.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DogList;