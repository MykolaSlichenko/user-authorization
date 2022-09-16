import React, { useEffect } from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';

import { initDatabase } from './fakeDB';

function App() {
  useEffect(() => {
    initDatabase();

    //todo: check if user is logged

  }, []);

  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
