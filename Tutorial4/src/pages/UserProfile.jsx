import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useContentLoader } from '../js/useContentLoader.js';

/* ------------------------------------------------------
 *  Author: Adam Sarty
 *  Student ID: B00794681
 *  T4 - CSCI4177
 * ------------------------------------------------------
 *  UserProfile displays user details fetched using their ID.
 */

function UserProfile() {
  useContentLoader(); // Initializes content loading

  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetches user data
    const fetchUser = async () => {
      const result = await axios(`https://express-t4.onrender.com/api/users/${id}`);
      setUser(result.data);
    };

    fetchUser();
  }, [id]);

  // Navigates back to user list
  const handleBack = () => {
    navigate('/users');
  };

  // Page layout
  return (
    <div className="container">
      <div className="content">
        <div className="profile">
          <button onClick={handleBack}>Back</button>
          <img src={user.picture} alt={user.name} />
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
          <div className="detail-container">
            <div className="detail-box">
              <p><b>Company</b>: {user.company}</p>
              <p><b>Phone</b>: {user.phone}</p>
            </div>
            <div className="detail-box">
              <p>{user.about}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
