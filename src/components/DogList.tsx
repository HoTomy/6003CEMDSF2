import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from './common/http-common';
import { Link } from 'react-router-dom';

function DogList() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    // Fetch the list of dogs from the API
    const fetchDogs = async () => {
      try {
        const response = await axios.get(`${api.uri}/dog`)
        setDogs(response.data);
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };

    fetchDogs();
  }, []);

  return (
    <div>
      <h2>Dog List</h2>
      {dogs.length === 0 ? (
        <p>No dogs available</p>
      ) : (
        <ul>
          {dogs.map((dog) => (
            <li key={dog.id}>
              <Link to={`/dogs/${dog.id}`}>
                <h3>{dog.name}</h3>
              </Link>
              <p>{dog.breeds}</p>
              <p>Center: ${dog.center}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DogList;