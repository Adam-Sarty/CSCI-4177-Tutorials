import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import UserList from './pages/UserList';
import UserProfile from './pages/UserProfile';
import { Footer } from './components/Footer';

/* ------------------------------------------------------
 *  Author: Adam Sarty
 *  Student ID: B00794681
 *  T4 - CSCI4177
 * ------------------------------------------------------
 *  Main application component with routing based on 
 *  login state.
 */

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Defines routes and redirects based on login status
  return (
    <Router>
      <Routes>
        <Route path="/" element={!isLoggedIn ? <Login onLoginSuccess={() => setIsLoggedIn(true)} /> : <Navigate replace to="/users" />} />
        <Route path="/users" element={isLoggedIn ? <UserList /> : <Navigate replace to="/" />} />
        <Route path="/user/:id" element={isLoggedIn ? <UserProfile /> : <Navigate replace to="/" />} />
      </Routes>
      <Footer /> {/* Footer component displayed on all pages */}
    </Router>
  );
}

export default App;
