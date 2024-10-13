import { privateUrls } from './urls';
import Home from '../views/home';
import Profile from '../views/profile';
import Settings from '../views/settings';
import Notification from 'src/views/notifications';
import Request from 'src/views/request';
import History from 'src/views/request/history';

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
  {
    path: privateUrls.NOTIFICATION,
    element: <Notification />,
    handle: (data?: never) => {
      return {
        crumb: [],
        rightContent: true,
        data,
      };
    },
  },
  {
    path: privateUrls.REQUEST,
    element: <Request />,
    handle: (data?: never) => {
      return {
        crumb: [],
        rightContent: true,
        data,
      };
    },
  },
  {
    path: privateUrls.HISTORY,
    element: <History />,
    handle: (data?: never) => {
      return {
        crumb: [],
        rightContent: true,
        data,
      };
    },
  },
];
