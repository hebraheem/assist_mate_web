import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { publicUrls } from '../routes/urls';

const AuthLayout = () => {
  if (window.location.pathname === '/')
    return <Navigate to={publicUrls.SIGN_IN} />;

  return (
    <div className="flex justify-center items-center h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
