import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import {checkIfUserLogged} from './fakeDB';

const ProtectedRoute = ({ user, children }) => {
  const isLoged = checkIfUserLogged();

  if (!isLoged) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;