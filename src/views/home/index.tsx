import { useEffect, useState } from 'react';
import GeoMap from '../../components/google-service/google-map';
import { auth } from 'src/services/firebase';
import ResponsiveModalDrawer from 'src/components/ui/modal';
import Button from 'src/components/ui/button';
import { useI18n } from 'src/services/languages/i18fn';
import { useVerifyEmail } from 'src/services/mutations/user-auth';
import { toast } from 'react-toastify';

const Home = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const i18n = useI18n();
  const user = auth.currentUser;

  useEffect(() => {
    if (user && !user.emailVerified) {
      setEmailVerified(false);
    } else if (user && user.emailVerified) {
      setEmailVerified(true);
    } else {
      setEmailVerified(false);
    }
  }, [user]);

  const { mutate, isPending } = useVerifyEmail({
    onError: () => {
      toast.error(i18n.msg('EMAIL_VERIFICATION_FAIL'));
    },
    onSuccess: async () => {
      setEmailVerified(true);
    },
  });

  console.log('emailVerified :>> ', emailVerified);
  return (
    <div>
      <ResponsiveModalDrawer
        hideCloseBtn
        isOpen={!emailVerified}
        onClose={() => {
          // do nothing
        }}
      >
        <div className="text-center">
          <p className="text-xl pb-4">{i18n.msg('EMAIL_NOT_VERIFIED')}</p>
          <p className="text-sm text-slate-500 pb-4">{i18n.msg('VERIFY_NOW_TO_CONTINUE')}</p>
          <Button
            isLoading={isPending}
            className="p-2 text-sm"
            label={i18n.msg('VERIFY_EMAIL')}
            onClick={() => mutate()}
          />
        </div>
      </ResponsiveModalDrawer>
      <GeoMap />
    </div>
  );
};

export default Home;
