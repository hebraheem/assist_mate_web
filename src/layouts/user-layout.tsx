import { Navigate, Outlet } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { useI18n } from '../services/languages/i18fn';
import { SUPPORTED_LOCALE } from '../utils/constant';
import useAuthentication from '../auth/useAuthentication';
import { privateUrls, publicUrls } from '../routes/urls';

const UserLayout = () => {
  const [lang, setLang] = useState<string>();
  const i18n = useI18n();
  const { isLoading, isAuthenticated } = useAuthentication();

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

  return (
    <div className="">
      <div className="h-16 w-100 flex justify-between items-center px-[16px] bg-slate-100">
        <div>Menu</div>
        <div className="flex items-center">
          <select
            value={lang}
            className="p-2 rounded-lg mr-3"
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
            <span className="material-icons text-red-700 text-[14px] absolute right-[-2px] top-[-5px] z-10">
              notifications
            </span>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default UserLayout;
