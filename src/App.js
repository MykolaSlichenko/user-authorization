import React, { useEffect } from 'react';
import './App.css';
import {
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import { initDatabase } from './fakeDB';
import Header from './components/Header/Header';
import {checkIfUserLogged, getUser, registerUser} from './fakeDB';
import {useNavigate} from "react-router-dom";

function Layout() {
  return (
    <div>
      <h1>Welcome to the app!</h1>
      <nav>
        <Link to="invoices">Invoices</Link> |{" "}
        <Link to="dashboard">Dashboard</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}



function App() {
  useEffect(() => {
    initDatabase();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    // const isLogged = checkIfUserLogged();
    // if (!isLogged) {
    //   navigate("/login");
    // } else {
    //   console.log('Login');
    //   const user = getUser();
    //   console.log('user', user);
    //
    // }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
      </Route>
      <Route>
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  )
  // return (
  //   <Routes>
  //     <Route path='/'>
  //       <RouteWrapper index element={<Home />} layout={<Header />} />
  //       <Route path='signup' element={<Signup />} />
  //       <Route path='login' element={<Login />} />
  //     </Route>
  //   </Routes>
  // );
}


export default App;

//TODO:
//1. Add header to layout in react route
//2. Make public and private routes
//3. Add auto redirect if user not logged in to login and redirect to home if user logged in and open login or sign up