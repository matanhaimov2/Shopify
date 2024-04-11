import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Main CSS
import './App.css';

// Pages
import Home from './Pages/Home/home';
import Cart from './Pages/Cart/cart';
import Login from './Pages/Login/login';



// Components
import TopNav from './Components/TopNav/topnav';

// Services
import { healthCheck } from './Services/administrationService';


// Functions
function home() {
  return <Home />;
}

// Functions
function cart() {
  return <Cart />;
}

// Functions
function login() {
  return <Login />;
}


// Main Function
function App() {

  useEffect(() => {
    const healthChecker = async () => {
      let res = await healthCheck();

      if (!res && window.location.pathname !== '/sitenotfound') {
        window.location.href = '/sitenotfound';
      }
    }

    // Call Health Checker to see if back is alive
    healthChecker();
  }, [])

  return (
    <div className="outer-wrapper">
      <div className='wrapper'>
        <Router>
          <div className='com-with-nav-wrapper'>

            <div className='com-with-nav'>
              <TopNav />
            </div>

            <div className='com-with-nav-item'>
              <Routes>
                <Route path='/' element={home()} />
                <Route path='/cart' element={cart()} />
                <Route path='/login' element={login()} />

                <Route path='/sitenotfound' element={<div>site is under constarction</div>} />

                {/* Page Doesnt Exists */}
                <Route path='/*' element={<div>404 doesnt exists</div>} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;

