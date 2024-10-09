import { useAuth, UserButton } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';
import { privateUrls, publicUrls } from '../routes/urls';
import { Suspense } from 'react';
import { DotIcon } from '../constants/svgs/dot-icon';
import { AdvanceSettingIcon } from '../constants/svgs/settings';

const UserLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <Suspense fallback={'loading...'} />;

  if (isLoaded && !isSignedIn) return <Navigate to={publicUrls.SIGN_IN} />;

  return (
    <div className="">
      <div className="h-16 w-100 flex justify-between items-center px-[16px] bg-slate-100">
        <div>Menu</div>
        <div className="relative">
          <span className="material-icons text-red-700 text-[14px] absolute right-[-2px] top-[-5px] z-10">
            notifications
          </span>
          <UserButton afterSignOutUrl={publicUrls.SIGN_IN} appearance={{}} showName={true}>
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
      <Outlet />
    </div>
  );
};

export default UserLayout;
