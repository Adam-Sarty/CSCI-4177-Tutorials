import React from 'react';
import './App.css';

function App() {
  const handleClick = () => {
    alert('Button was clicked!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>Click me!</button>
        <p>Adam Sarty - B00794681 - CSCI3172</p>
      </header>
    </div>
  );
}

export default App;
