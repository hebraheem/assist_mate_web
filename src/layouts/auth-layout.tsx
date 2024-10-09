import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { publicUrls } from '../routes/urls';

const AuthLayout = () => {
  if (window.location.pathname === '/')
    return <Navigate to={publicUrls.SIGN_IN} />;

  return (
    <div className="flex justify-center items-center my-16">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
