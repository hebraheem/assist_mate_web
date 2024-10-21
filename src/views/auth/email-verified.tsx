import { useEffect, useState } from 'react';
import { useI18n } from '../../services/languages/i18fn';
import { useNavigate } from 'react-router-dom';
import { privateUrls } from '../../routes/urls';
import { toast } from 'react-toastify';
import { auth } from 'src/services/firebase';
import Button from 'src/components/ui/button';
import { getAuth } from 'firebase/auth';

const EmailVerified = () => {
  const [verified, setVerified] = useState(false);
  const i18n = useI18n();
  const navigate = useNavigate();

  useEffect(
    () => {
      const checkVerification = async () => {
        const _user = getAuth().currentUser;
        console.log('_user :>> ', _user);
        const user = auth.currentUser;
        if (user) {
          // Reload the user to get the updated verification status
          await user.reload();
          if (user.emailVerified) {
            toast.success(i18n.msg('EMAIL_VERIFIED'));
            setVerified(true);
            setTimeout(() => {
              navigate(privateUrls.HOME);
            }, 3000);
          } else {
            setVerified(false);
            toast.error(i18n.msg('EMAIL_NOT_VERIFIED'));
          }
        } else {
          toast.error(i18n.msg('NO_USER_FOUND'));
        }
      };

      checkVerification();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className=" text-white text-center">
      <div className="text-center mt-4 mb-6">{verified ? 'verified' : 'Not verified'}</div>
      <Button
        label={i18n.msg('RESENT_VERIFICATION')}
        className={`p-1 ${verified ? 'hidden' : ''}`}
        onClick={() => {
          console.log('object :>> ');
        }}
      />
    </div>
  );
};

export default EmailVerified;
