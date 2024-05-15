import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Canine Shelter</h1>
      <p>Choose your right pet!</p>

      <div>
        <Link to="/DogList">
          <button>Dog List</button>
        </Link>
        <Link to="/Login">
          <button>Login</button>
        </Link>
        <Link to="/Register">
          <button>Register</button>
        </Link>
        <Link to="/ApplicationForm">
          <button>Application Form</button>
        </Link>
        <Link to="/Dogaip1">
          <button>Dog API</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;