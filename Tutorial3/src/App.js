import './App.css';
import './styles/styles.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Register } from "./pages/Register";
import { Profile } from './pages/Profile';
import { Footer } from './components/Footer';

/* ------------------------------------------------------
 *  Author: Adam Sarty
 *  Student ID: B00794681
 *  T3 - CSCI4177
 * ------------------------------------------------------
 */

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
