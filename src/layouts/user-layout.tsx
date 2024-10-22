import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useRef, useState } from 'react';

import { useI18n } from '../services/languages/i18fn';
import { noUserImage, SUPPORTED_LOCALE } from '../utils/constant';
import useAuthentication from '../auth/useAuthentication';
import { privateUrls, publicUrls } from '../routes/urls';
import MenubarComponent from '../components/ui/menu-bar';
import { BellDotIcon, History, House, LogOut, MessageSquare, Settings, Settings2, User } from 'lucide-react';
import { logout } from 'src/services/serviceFn/users';
import usePullToRefresh, { PullIndicator } from 'src/components/ui/pull-refresh';
import { auth } from 'src/services/firebase';

const navItem = [
  { label: 'HOME', icon: <House className="w-6 h-6" />, href: privateUrls.HOME },
  { label: 'HISTORY', icon: <History className="w-6 h-6" />, href: privateUrls.HISTORY },
  { label: 'CHAT', icon: <MessageSquare className="w-6 h-6" />, href: privateUrls.NOTIFICATION },
  { label: 'SETTINGS', icon: <Settings2 className="w-6 h-6" />, href: privateUrls.SETTINGS },
];

const UserLayout = () => {
  const [lang, setLang] = useState<string>();
  const navigate = useNavigate();
  const i18n = useI18n();
  const refreshCont = useRef<any>(0);
  const { isLoading, isAuthenticated, user } = useAuthentication();
  const { polling, pullChangeDegree } = usePullToRefresh(refreshCont, () => auth.currentUser?.reload());

  useEffect(
    () => {
      setLang(i18n.getLocaleInfo().code);
    },
    // eslint-disable-next-line
    []
  );

  if (isLoading) return <Suspense fallback={'loading...'} />;
  if (!isAuthenticated) return <Navigate to={publicUrls.SIGN_IN} />;
  if (isAuthenticated && window.location.pathname === '/' && user.emailVerified)
    return <Navigate to={privateUrls.HOME} />;

  const photoUrl = user?.photoURL ?? noUserImage;
  return (
    <div className="bg-light-blue-gradient w-full min-h-screen relative" ref={refreshCont}>
      {polling && <PullIndicator pullChangeDegree={pullChangeDegree} />}

      <div className="absolute inset-10 flex items-center justify-center z-0">
        <div className="absolute top-10 left-0 w-16 h-16">
          <img src="https://img.icons8.com/?size=100&id=PZpLpwIPUpaF&format=png&color=000000" alt="help-up" />
        </div>
        <div className="absolute top-24 right-10 w-24 h-24 rounded-full">
          <img src="https://img.icons8.com/?size=100&id=23530&format=png&color=000000" alt="think" />
        </div>
        <div className="absolute bottom-20 left-12 w-32 h-32">
          <img src="https://img.icons8.com/?size=100&id=15975&format=png&color=000000" alt="hand-c" />
        </div>
        <div className="absolute bottom-72 right-72 w-32 h-32">
          <img src="https://img.icons8.com/?size=100&id=p4rXi9HURgXT&format=png&color=000000" alt="help-logo" />
        </div>
        <div className="absolute top-52 left-52 w-16 h-16">
          <img width="50" height="50" src="https://img.icons8.com/ios/50/why-quest.png" alt="why-quest" />
        </div>
        <div className="absolute bottom-10 right-10 w-16 h-16">
          <img width="50" height="50" src="https://img.icons8.com/ios/50/information--v1.png" alt="information--v1" />
        </div>
      </div>
      <div className="h-16 w-100 flex justify-between items-center px-[16px] bg-slate-100">
        <div>
          <button onClick={() => navigate(privateUrls.HOME)}>
            <img src="./images/logo192.png" className="w-10 h-10 rounded-full cursor-pointer" alt="logo" />
          </button>
        </div>
        <div className="md:flex hidden justify-between items-center gap-10">
          {navItem.map((item) => {
            const active = window.location.pathname.includes(item.href);
            return (
              <Link
                to={item.href}
                key={item.href}
                role="button"
                className={`flex flex-col items-center ${active && 'text-blue-500'}`}
              >
                <h4 className="text-sm">{item.label}</h4>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center">
          <select
            value={lang}
            aria-label="language"
            className="p-2 rounded-lg mr-3 focus:outline-none"
            onChange={({ target }) => {
              i18n.updateLocale(target.value, (value) => {
                if (value) {
                  window.location.reload();
                }
              });
              setLang(target.value);
            }}
          >
            {Object.entries(SUPPORTED_LOCALE).map(([key, value]) => (
              <option value={key} key={key}>
                {i18n.msg(value)}
              </option>
            ))}
          </select>
          <div className="relative">
            <MenubarComponent
              menuTrigger={<img src={photoUrl} alt="user-photo" className="w-8 h-8 object-fill rounded-full" />}
              rootClassName="rounded-full"
              itemClass="text-sm"
              contentClass="z-30"
              menubarItems={[
                {
                  key: 'Profile',
                  label: user?.email,
                  icon: <User className="text-sm" />,
                  itemProp: {},
                },
                {
                  key: 'settings',
                  label: i18n.msg('SETTINGS'),
                  icon: <Settings className="text-sm" />,
                  itemProp: { onClick: () => navigate(privateUrls.SETTINGS) },
                },
                {
                  key: 'Notifications',
                  label: i18n.msg('NOTIFICATIONS'),
                  icon: <BellDotIcon className="text-sm" />,
                  itemProp: { onClick: () => navigate(privateUrls.NOTIFICATION) },
                },
                {
                  key: 'SIGN-OUT',
                  label: i18n.msg('SIGN_OUT'),
                  icon: <LogOut />,
                  itemProp: {
                    onClick: () => {
                      logout();
                      navigate(publicUrls.SIGN_IN);
                    },
                  },
                },
              ]}
            />
            <span className="material-icons text-red-700 text-[14px] absolute right-1  top-1 z-10">notifications</span>
          </div>
        </div>
      </div>
      <div className="relative z-1">
        <Outlet />
      </div>
      <div className="md:hidden flex justify-between px-6 py-3 w-full items-center fixed bottom-0 bg-slate-100 rounded-t-2xl">
        {navItem.map((item) => {
          const active = window.location.pathname.includes(item.href);
          return (
            <Link
              to={item.href}
              key={item.href}
              role="button"
              className={`flex flex-col items-center ${active && 'text-blue-500'} text-sm`}
            >
              {item.icon}
              <p>{item.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default UserLayout;
