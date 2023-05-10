import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import ProfileInformation from './pages/ProfileInformation/ProfileInformation';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import { initDatabase } from './fakeDB';
import Header from './components/Header/Header';
import { checkIfUserLogged } from './fakeDB';
import ProtectedRoute from './ProtectedRoute';

function App() {
  useEffect(() => {
    initDatabase();
  }, []);

  const isLogged = checkIfUserLogged();

  return (
    <Routes>
      <Route path="/" element={<Header />} >
        <Route
          path="/home"
          element={
            <ProtectedRoute user={isLogged}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={isLogged}>
              <ProfileInformation />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
    </Routes>
  )
}


export default App;
