// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import TaskManager from './Components/TaskManager';
import { logout } from './actions/authActions';
import Logout from './Components/Logout';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  useEffect(() => {
    // Optionally, check for a token and verify session here
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <Router>
      <div>
        <nav>
          {!isAuthenticated && <Link to="/">Login</Link>}
          {!isAuthenticated && <Link to="/register">Register</Link>}
          {isAuthenticated && <Link to="/tasks">Task Manager</Link>}
          {isAuthenticated && <Logout />}
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protect the TaskManager route */}
          <Route
            path="/tasks"
            element={isAuthenticated ? <TaskManager /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
