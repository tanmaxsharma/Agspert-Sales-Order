// RequireAuth.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './auth';

function RequireAuth() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default RequireAuth;
