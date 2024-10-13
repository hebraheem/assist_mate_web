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
    <div className="border-2 bg-white h-screen items-center flex justify-center">
      <div className="sm:w-[90%] md:w-[60%] lg:w-[40%] xl:w-[30%] xl m-auto p-6 rounded-2xl shadow-2xl border-2  h-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
