import React, { useState } from 'react';
import axios from 'axios';

function EnquiryForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const enquiryData = {
      name,
      email,
      position,
    };

    try {
      await axios.post('/api/applications', applicationData);
      alert('Application submitted successfully!');
      // Reset the form after successful submission
      setName('');
      setEmail('');
      setPosition('');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting the application. Please try again.');
    }
  };

  return (
    <div>
      <h2>Application Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Application:
          <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EnquiryForm;