/**
 * ==============================================================================
 * CSCI3172 L7
 * @author Adam Sarty, B00794681
 * ==============================================================================
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css'

// Profile component displays the user's submitted information
// @param {Object} formData - Contains user's form submission data
const Profile = ({ formData }) => (
  <div>
    <h2>Profile Page</h2>
    <p>First Name: <b>{formData.firstName}</b></p>
    <p>Last Name: <b>{formData.lastName}</b></p>
    <p>Email: <b>{formData.email}</b></p>
    <p>Favorite Season: <b>{formData.season}</b></p>
    <Link to="/dashboard">Go to Dashboard</Link>
  </div>
);

// Retrieved from https://loremipsum.io/ on March 25, 2024.
const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
);

// Form component for capturing user input
// @param {Function} onValidSubmit - Callback function to execute upon valid form submission
const Form = ({ onValidSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    season: '',
  });
  const [error, setError] = useState('');

  // Validates the form data
  // @returns {String} - Returns an error message if validation fails, otherwise an empty string
  const validateForm = () => {
    const { firstName, lastName, email, password, season } = formData;
    if (!firstName.match(/^[A-Za-z]+$/)) {
      return 'First Name should only contain alphabets.';
    }
    if (!lastName.match(/^[A-Za-z]+$/)) {
      return 'Last Name should only contain alphabets.';
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return 'Please enter a valid email address.';
    }
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }
    if (!season) {
      return 'Please select your favorite season.';
    }
    return '';
  };

  // Handles the form submission
  // @param {Event} e - The form submission event
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
    } else {
      setError('');
      onValidSubmit(formData);
      navigate('/profile');
    }
  };

  // Updates formData state on input change
  // @param {Event} e - The input change event
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Favorite Season:</label>
          <select name="season" value={formData.season} onChange={handleChange}>
            <option value="">Select a season</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

const App = () => {
  const [formData, setFormData] = useState(null);

  const handleValidSubmit = (data) => {
    setFormData(data);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form onValidSubmit={handleValidSubmit} />} />
        <Route path="/profile" element={formData ? <Profile formData={formData} /> : <div>Please submit the form.</div>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
