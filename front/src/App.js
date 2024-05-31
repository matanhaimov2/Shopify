import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main CSS
import './App.css';

// Pages
import Home from './Pages/Home/home';
import Cart from './Pages/Cart/cart';
import About from './Pages/About/about';
import Login from './Pages/Login/login';
import Register from './Pages/Register/register';


// Components
import { AuthProvider } from './Components/AuthContext';
import RouteChangeHandler from './Components/RouteChangeHandler';
import TopNav from './Components/TopNav/topnav';
import Footer from './Components/Footer/footer';

// Services
import { healthCheck } from './Services/administrationService';


// Functions
function home() {
  return <Home />;
}

function cart() {
  return <Cart />;
}

function about() {
  return <About />;
}

function login() {
  return <Login />;
}

function register() {
  return <Register />
}

// For Components With Topnav
const ComponentsWithNav = () => {
  return (
    <div className='com-with-nav-wrapper'>

      <div className='com-wrapper'>
        <div className='com-with-nav'>
          <TopNav />
        </div>

        <div className='com-with-nav-item'>
          <Routes>
            <Route path='/' element={home()} />
            {/* Route of specifc product: <Route path='/product/:id' element={home()} />  */}
            <Route path='/cart' element={cart()} />
            <Route path='/about' element={about()} />
          </Routes>
        </div>
      </div>

      <div className='com-with-footer'>
        <Footer />
      </div>
    </div>
  );
}

// Main Function
function App() {

  // Health check to see if back is alive
  useEffect(() => {
    const healthChecker = async () => {
      let res = await healthCheck();

      if (!res && window.location.pathname !== '/sitenotfound') {
        window.location.href = '/sitenotfound';
      }
    }

    healthChecker();
  }, [])


  return (
    <div className="outer-wrapper">
      <div className='wrapper'>
        <AuthProvider>
          <Router>
            <RouteChangeHandler />

            <Routes>
              {/* Routes With Topnav */}
              <Route path='/*' element={<ComponentsWithNav />} />

              <Route path='/login' element={login()} />
              <Route path='/register' element={register()} />

              {/* Backend Disabled */}
              <Route path='/sitenotfound' element={<div>site is under constarction</div>} />
              
              {/* Page Doesnt Exists */}
              <Route path='/*' element={<div>404 doesnt exists</div>} />
            </Routes>

          </Router>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;

