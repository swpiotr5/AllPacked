import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;