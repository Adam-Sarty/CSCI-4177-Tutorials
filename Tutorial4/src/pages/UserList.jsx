import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContentLoader } from '../js/useContentLoader.js';

/* ------------------------------------------------------
 *  Author: Adam Sarty
 *  Student ID: B00794681
 *  T4 - CSCI4177
 * ------------------------------------------------------
 *  UserList component for displaying a list of users.
 *  Includes search functionality.
 */

function UserList() {
  useContentLoader(); // Initializes content loading

  const [users, setUsers] = useState([]); // State for user data
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    // Fetches list of users
    const fetchUsers = async () => {
      const result = await axios('https://express-t4.onrender.com/api/users');
      setUsers(result.data);
    };

    fetchUsers();
  }, []);

  // Page layout with search and list of users
  return (
    <div class="container">
      <div class="content">
        <div class="userList">
          <input type="text" placeholder="Search... &#x1F50D;" onChange={(e) => setSearchTerm(e.target.value)} />
          <div class="list">
            {users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user) => (
              <Link key={user._id} to={`/user/${user._id}`}>
                <div class="user">
                  <img src={user.picture} alt={user.name}/>
                  <h2>{user.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
