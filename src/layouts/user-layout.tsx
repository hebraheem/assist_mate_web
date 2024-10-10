import { useAuth, UserButton } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';
import { privateUrls, publicUrls } from '../routes/urls';
import { Suspense, useEffect, useState } from 'react';
import { DotIcon } from '../constants/svgs/dot-icon';
import { AdvanceSettingIcon } from '../constants/svgs/settings';
import { useI18n } from '../services/languages/i18fn';
import { SUPPORTED_LOCALE } from '../utils/constant';

const UserLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const [lang, setLang] = useState<string>();
  const i18n = useI18n();

  useEffect(
    () => {
      setLang(i18n.getLocaleInfo().code);
    },
    // eslint-disable-next-line
    []
  );

  if (!isLoaded) return <Suspense fallback={'loading...'} />;

  if (isLoaded && !isSignedIn) return <Navigate to={publicUrls.SIGN_IN} />;
  if (isLoaded && isSignedIn && window.location.pathname === '/') return <Navigate to={privateUrls.HOME} />;

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
            <UserButton
              afterSignOutUrl={publicUrls.SIGN_IN}
              appearance={{ layout: { unsafe_disableDevelopmentModeWarnings: true } }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Advance settings"
                  labelIcon={<AdvanceSettingIcon />}
                  href={privateUrls.SETTINGS}
                />
                <UserButton.Action label="Notification" labelIcon={<DotIcon />} open={privateUrls.NOTIFICATION} />
              </UserButton.MenuItems>
              <UserButton.UserProfilePage label="Notifications" labelIcon={<DotIcon />} url={privateUrls.NOTIFICATION}>
                <div>
                  <h1>Help Page</h1>
                  <p>This is the custom help page</p>
                </div>
              </UserButton.UserProfilePage>
            </UserButton>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default UserLayout;
