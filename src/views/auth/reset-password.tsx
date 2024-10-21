import { useState } from 'react';
import Input from '../../components/forms/Input';
import { IUser } from '../../@types/user';
import { useI18n } from '../../services/languages/i18fn';
import Button from '../../components/ui/button';
import { useSendResetPasswordLink } from '../../services/mutations/user-auth';
import { useNavigate } from 'react-router-dom';
import { publicUrls } from '../../routes/urls';
import { defaultUser } from '../../utils/constant/defaultData';
import { toast } from 'react-toastify';
import { errorTransform } from 'src/utils/methods/helpers';

const ResetPassword = () => {
  const [user, setUser] = useState<IUser>(defaultUser);
  const i18n = useI18n();
  const navigate = useNavigate();
  const { mutate, isPending } = useSendResetPasswordLink({
    onSuccess: () => {
      toast(errorTransform(i18n.msg('PASSWORD_REQUEST_SENT')), { type: 'success' });
      navigate(publicUrls.SIGN_IN);
    },
    onError: (err) => {
      toast(errorTransform(err.message), { type: 'error' });
    },
  });

  return (
    <div className=" text-white">
      <div className="text-center mt-4 mb-6">
        <h3 className="text-2xl">{i18n.msg('ENTER_EMAIL_TO_REST_PASSWORD')}</h3>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <Input
            required
            id="email"
            type="email"
            labelClass="text-white"
            label={i18n.msg('EMAIL')}
            wrapperClass="mb-3 mx-3 text-black"
            value={user?.email as string}
            onChange={({ target }) => setUser((prev) => ({ ...prev, email: target.value }))}
            placeholder={i18n.msg('EMAIL')}
          />
          <p className="text-xs flex justify-end mr-3 hover:text-purple-900">
            <button type="button" onClick={() => navigate(publicUrls.SIGN_IN)}>
              {i18n.msg('SIGNIN')}
            </button>
          </p>
        </div>

        <Button
          type="submit"
          isLoading={isPending}
          wrapperClass="mt-6 mx-3"
          label={i18n.msg('REQUEST_RESET_PASSWORD')}
          onClick={() => {
            if (!user.email) return;
            mutate(user as any);
          }}
          className="p-2  bg-blue-900 text-white hover:bg-blue-800 border-none"
        />
      </form>
    </div>
  );
};

export default ResetPassword;
