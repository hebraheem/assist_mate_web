// import { lazy } from 'react';
import { publicUrls } from './urls';
import SignInClerk from '../views/auth/sign-in';
import SignUpClerk from '../views/auth/sign-up';

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
        path: publicUrls.SING_UP,
        element: <SignUpClerk />,
        handle: (data?: never) => {
            return {
                isLogin: true,
                data,
            };
        },
    },
];
