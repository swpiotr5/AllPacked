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
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/forecast" element={<Forecast/>} />
        <Route path="/budget" element={<Budget/>} />
        <Route path="/planner" element={<Planner/>} />
        <Route path="/history" element={<History/>} />
      </Routes>
    </Router>
  );
}

export default App;
