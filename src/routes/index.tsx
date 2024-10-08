import {
  createBrowserRouter,
  RouteObject,
  useRouteError,
} from 'react-router-dom';

import { publicRouteConfig } from './public-route';
import AuthLayout from '../layouts/auth-layout';
import { privateRouteConfig } from './private-route';
import UserLayout from '../layouts/user-layout';

const ErrorBoundary = () => {
  const error = useRouteError();
  // eslint-disable-next-line
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <UserLayout />,
    errorElement: <ErrorBoundary />,
    children: [...privateRouteConfig],
  },
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <ErrorBoundary />,
    children: [...publicRouteConfig],
  },
  {
    path: '*',
    element: <div>not found</div>,
  },
];

export const router = createBrowserRouter(routes);

export default ErrorBoundary;
