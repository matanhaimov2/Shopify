import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main CSS
import './App.css';

// Pages
import Home from './Pages/Home/home';

// Functions
function home() {
  return <Home />;
}

// Main Function
function App() {
  return (
    <div className="outer-wrapper">
      <div className='wrapper'>
        <Router>
          <Routes>
            <Route path='/' element={ home() } />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
