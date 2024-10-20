import { Navigate, Outlet } from 'react-router-dom';
import { privateUrls, publicUrls } from '../routes/urls';
import { Suspense } from 'react';
import useAuthentication from '../auth/useAuthentication';

const AuthLayout = () => {
  const { isLoading, isAuthenticated } = useAuthentication();

  if (isLoading) return <Suspense fallback={'loading...'} />;
  if (isAuthenticated) return <Navigate to={privateUrls.HOME} />;
  if (window.location.pathname === '/') return <Navigate to={publicUrls.SIGN_IN} />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <div className="relative sm:p-10 p-5 m-3 bg-white bg-opacity-5 backdrop-blur-md rounded-xl shadow-md w-full max-w-md border border-white border-opacity-30">
        <div className="absolute inset-0 flex items-center justify-center z-0">
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-green-400 rounded-full"></div>
          <div className="absolute top-24 right-0 w-24 h-24 bg-red-500 rounded-full"></div>
          <div className="absolute bottom-20 left-12 w-32 h-32 bg-blue-400 rounded-full"></div>
        </div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
