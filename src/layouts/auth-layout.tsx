import { Navigate, Outlet } from 'react-router-dom';
import { privateUrls, publicUrls } from '../routes/urls';
import { Suspense } from 'react';
import useAuthentication from '../auth/useAuthentication';

const AuthLayout = () => {
  const { isLoading, isAuthenticated, user } = useAuthentication();

  if (isLoading) return <Suspense fallback={'loading...'} />;
  if (isAuthenticated && user?.emailVerified) return <Navigate to={privateUrls.HOME} />;
  if (window.location.pathname === '/') return <Navigate to={publicUrls.SIGN_IN} />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <div className="absolute inset-10 flex items-center justify-center z-0">
        <div className="absolute top-0 left-0 w-16 h-16 bg-green-400 rounded-full">
          <img src="https://img.icons8.com/?size=100&id=PZpLpwIPUpaF&format=png&color=000000" alt="help-up" />
        </div>
        <div className="absolute top-24 right-10 w-24 h-24 bg-red-500 rounded-full">
          <img src="https://img.icons8.com/?size=100&id=23530&format=png&color=000000" alt="think" />
        </div>
        <div className="absolute bottom-20 left-12 w-32 h-32 bg-blue-400 rounded-full text-center">
          <img src="https://img.icons8.com/?size=100&id=15975&format=png&color=000000" alt="hand-c" />
        </div>
        <div className="absolute bottom-72 right-72 w-32 h-32 bg-orange-400 rounded-full">
          <img src="https://img.icons8.com/?size=100&id=p4rXi9HURgXT&format=png&color=000000" alt="help-logo" />
        </div>
      </div>
      <div className="relative sm:p-10 p-5 m-3 bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-md w-full max-w-md border border-white border-opacity-30">
        <div className="relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
