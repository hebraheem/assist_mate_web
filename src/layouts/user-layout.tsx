import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';

import { useI18n } from '../services/languages/i18fn';
import { noUserImage, SUPPORTED_LOCALE } from '../utils/constant';
import useAuthentication from '../auth/useAuthentication';
import { privateUrls, publicUrls } from '../routes/urls';
import MenubarComponent from '../components/ui/menu-bar';
import { BellDotIcon, History, House, LogOut, MessageSquare, Settings, Settings2, User } from 'lucide-react';
import { logout } from 'src/services/serviceFn/users';

const navItem = [
  { label: 'HOME', icon: <House />, href: privateUrls.HOME },
  { label: 'HISTORY', icon: <History />, href: privateUrls.HISTORY },
  { label: 'CHAT', icon: <MessageSquare />, href: privateUrls.NOTIFICATION },
  { label: 'SETTINGS', icon: <Settings2 />, href: privateUrls.SETTINGS },
];

const UserLayout = () => {
  const [lang, setLang] = useState<string>();
  const navigate = useNavigate();
  const i18n = useI18n();
  const { isLoading, isAuthenticated, user } = useAuthentication();

  useEffect(
    () => {
      setLang(i18n.getLocaleInfo().code);
    },
    // eslint-disable-next-line
    []
  );

  if (isLoading) return <Suspense fallback={'loading...'} />;
  if (!isAuthenticated) return <Navigate to={publicUrls.SIGN_IN} />;
  if (isAuthenticated && window.location.pathname === '/') return <Navigate to={privateUrls.HOME} />;

  const photoUrl = user?.photoUrl ?? noUserImage;
  return (
    <div className="">
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
                className={`flex flex-col items-center ${active && 'text-slate-500'}`}
              >
                <h4 className="text-sm">{item.label}</h4>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center">
          <select
            value={lang}
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
                  label: i18n.msg('PROFILE'),
                  icon: <User className="text-sm" />,
                  itemProp: { onClick: () => navigate(privateUrls.PROFILE) },
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
            <span className="material-icons text-red-700 text-[14px] absolute right-1 top-1 z-10">notifications</span>
          </div>
        </div>
      </div>
      <Outlet />
      <div className="md:hidden flex justify-between w-full h-[56px] items-center fixed bottom-0 p-6 bg-slate-100 rounded-t-2xl">
        {navItem.map((item) => {
          const active = window.location.pathname.includes(item.href);
          return (
            <Link
              to={item.href}
              key={item.href}
              role="button"
              className={`flex flex-col items-center ${active && 'text-slate-500'}`}
            >
              {item.icon}
              <h4 className="text-sm">{item.label}</h4>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default UserLayout;
