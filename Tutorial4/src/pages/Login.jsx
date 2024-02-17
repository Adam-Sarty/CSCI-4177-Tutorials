import React, { useState } from 'react';
import axios from 'axios';
import { useContentLoader } from '../js/useContentLoader.js';

/* ------------------------------------------------------
 *  Author: Adam Sarty
 *  Student ID: B00794681
 *  T4 - CSCI4177
 * ------------------------------------------------------
 *  Login component for handling user login.
 */

function Login({ onLoginSuccess }) {
  useContentLoader(); // Initializes content loading

  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior
    try {
      const response = await axios.post('https://express-t4.onrender.com/api/login', {
        username: email,
        password: password,
      });
      if (response.status === 200) {
        onLoginSuccess(); // Callback on successful login
      } else {
        alert('Login failed'); // Notify on login failure
      }
    } catch (error) {
      alert('Login error:', error); // Notify on login error
    }
  };

  // Page layout for login
  return (
    <div class="container">
      <div class="content">
        <form onSubmit={handleSubmit}>
          <h1>Welcome to Tutorial 4</h1>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
          <br/>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
