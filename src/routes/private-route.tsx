import { privateUrls } from './urls';
import Home from '../views/home';
import Profile from '../views/profile';
import Settings from '../views/settings';

export const privateRouteConfig = [
    {
        path: privateUrls.HOME,
        element: <Home />,
        handle: (data?: never) => {
            return {
                crumb: [],
                rightContent: true,
                data,
            };
        },
    },
    {
        path: privateUrls.PROFILE,
        element: <Profile />,
        handle: (data?: never) => {
            return {
                crumb: [],
                rightContent: true,
                data,
            };
        },
    },
    {
        path: privateUrls.SETTINGS,
        element: <Settings />,
        handle: (data?: never) => {
            return {
                crumb: [],
                rightContent: true,
                data,
            };
        },
    },
];
