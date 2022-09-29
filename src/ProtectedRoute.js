import React from 'react';
import { Navigate } from 'react-router-dom';
import { checkIfUserLogged } from './fakeDB';

const ProtectedRoute = ({ user, children }) => {
  const isLogged = checkIfUserLogged();

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;