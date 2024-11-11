import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Forecast from './pages/Forecast';
import Budget from './pages/Budget';
import Planner from './pages/Planner';
import History from './pages/History';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        setIsAuth(true);
      }
      setLoading(false);
    };
    checkIfAuth();

    window.addEventListener('storage', checkIfAuth);

    return () => {
      window.removeEventListener('storage', checkIfAuth);
    };
  }, []);

  if (loading) {
    return <div className="bg-custom-dark-blue">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuth ? <Home setIsAuth={setIsAuth}/> : <Login setIsAuth={setIsAuth}/>} />
        <Route path="/login" element={!isAuth ? <Login setIsAuth={setIsAuth}/> : <Home/>} />
        <Route path="/register" element={!isAuth ? <Register/> : <Home setIsAuth={setIsAuth}/>} />
        <Route path="/home" element={isAuth ? <Home setIsAuth={setIsAuth}/> : <Login setIsAuth={setIsAuth}/>} />
        <Route path="/forecast" element={isAuth ? <Forecast setIsAuth={setIsAuth}/> : <Login setIsAuth={setIsAuth}/>} />
        <Route path="/budget" element={isAuth ? <Budget setIsAuth={setIsAuth}/> : <Login setIsAuth={setIsAuth}/>} />
        <Route path="/planner" element={isAuth ? <Planner setIsAuth={setIsAuth}/> : <Login setIsAuth={setIsAuth}/>} />
        <Route path="/history" element={isAuth ? <History setIsAuth={setIsAuth}/> : <Login setIsAuth={setIsAuth}/>} />
      </Routes>
    </Router>
  );
}

export default App;
