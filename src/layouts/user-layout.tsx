import { UserButton } from '@clerk/clerk-react';
import { Outlet } from 'react-router-dom';
import { privateUrls, publicUrls } from '../routes/urls';

const UserLayout = () => {
  return (
    <div className="">
      <div className="h-16 w-100 flex justify-between items-center px-[16px] bg-slate-100">
        <div>Menu</div>
        <UserButton
          afterSignOutUrl={publicUrls.SIGN_IN}
          appearance={{}}
          showName={true}
        >
          <UserButton.MenuItems>
            <UserButton.Link
              label="Advance settings"
              labelIcon={
                <span className="material-icons">admin_panel_settings</span>
              }
              href={privateUrls.SETTINGS}
            />
          </UserButton.MenuItems>
        </UserButton>
      </div>
      <Outlet />
    </div>
  );
};

export default UserLayout;
