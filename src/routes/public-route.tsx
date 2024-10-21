// import { lazy } from 'react';
import { publicUrls } from './urls';
import SignInClerk from '../views/auth/sign-in';
import SignUpClerk from '../views/auth/sign-up';
import ResetPassword from 'src/views/auth/reset-password';
import Triggers from 'src/views/auth/tiggers';

export const publicRouteConfig = [
  {
    path: publicUrls.SIGN_IN,
    element: <SignInClerk />,
    handle: (data?: never) => {
      return {
        isLogin: true,
        data,
      };
    },
  },
  {
    path: publicUrls.SIGN_IN_ONE,
    element: <SignInClerk />,
    handle: (data?: never) => {
      return {
        isLogin: true,
        data,
      };
    },
  },
  {
    path: publicUrls.SING_UP,
    element: <SignUpClerk />,
    handle: (data?: never) => {
      return {
        isLogin: true,
        data,
      };
    },
  },
  {
    path: publicUrls.FORGOT_PASSWORD,
    element: <ResetPassword />,
    handle: (data?: never) => {
      return {
        isLogin: true,
        data,
      };
    },
  },
  {
    path: publicUrls.TRIGGER,
    element: <Triggers />,
    handle: (data?: never) => {
      return {
        isLogin: true,
        data,
      };
    },
  },
];
