import React from 'react';
import { Link } from 'react-router-dom';


function Home() {

  const imageUrl = 'https://i5.walmartimages.com/asr/674c679d-f282-4c09-9556-cdf4fb9443a0_1.4069ec9a03fcdd324ea284a9c9a0a400.jpeg';
  
  return (
    <div>
      <h1>Welcome to the Canine Shelter!</h1>
      <p>Find your new furry canine?</p>

      <div>
        <img src={imageUrl} alt="Logo" width={200} height={200} />
      </div>

      <div>
        <div className="button-row">
          <div>
            <Link to="/DogList">
              <button className="custom-button" style={{ width: '200px', fontSize: '16px' }}>Search for Canine</button>
            </Link>
          </div>
          <div>
            <Link to="/Login">
              <button className="custom-button" style={{ width: '200px', fontSize: '16px' }}>Login</button>
            </Link>
          </div>
        </div>
        <div className="button-row">
          <div>
            <Link to="/Register">
              <button className="custom-button" style={{ width: '200px', fontSize: '16px' }}>Register</button>
            </Link>
          </div>
          <div>
            <Link to="/ApplicationForm">
              <button className="custom-button" style={{ width: '200px', fontSize: '16px' }}>Application Form</button>
            </Link>
          </div>
        </div>
        <div className="button-row">
          <div>
            <Link to="/Dogapi1">
              <button className="custom-button" style={{ width: '200px', fontSize: '16px' }}>Search Dog Breed</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;