import { useEffect, useState } from 'react';
import Input from '../../components/forms/Input';
import { useI18n } from '../../services/languages/i18fn';
import Button from '../../components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { publicUrls } from '../../routes/urls';
import { toast } from 'react-toastify';
import { errorTransform } from 'src/utils/methods/helpers';
import { useConfirmRestPassword } from 'src/services/mutations/user-auth';

const ConfirmResetPassword = () => {
  const [restData, setRestData] = useState<{ oobCode: string; password: string }>({ oobCode: '', password: '' });
  const i18n = useI18n();
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('oobCode');
    if (code) {
      setRestData((prev) => ({ ...prev, oobCode: code }));
    } else {
      toast('Invalid or missing reset code.', { type: 'error' });
    }
  }, [location]);

  const { mutate, isPending } = useConfirmRestPassword({
    onSuccess: () => {
      toast(errorTransform('Password has been reset'), { type: 'success' });
      navigate(publicUrls.SIGN_IN);
    },
    onError: (err) => {
      toast(errorTransform(err.message), { type: 'error' });
    },
  });

  return (
    <div className=" text-white">
      <div className="text-center mt-4 mb-6">
        <h3 className="text-2xl">{i18n.msg('ENTER_NEW_PASSWORD')}</h3>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          required
          id="password"
          type="password"
          labelClass="text-white"
          label={i18n.msg('PASSWORD')}
          wrapperClass="mb-3 mx-3 text-black"
          value={restData.password}
          onChange={({ target }) => setRestData((prev) => ({ ...prev, password: target.value }))}
          placeholder={i18n.msg('PASSWORD')}
        />

        <Button
          type="submit"
          isLoading={isPending}
          wrapperClass="mt-6 mx-3"
          label={i18n.msg('RESET_PASSWORD')}
          onClick={() => {
            if (!restData.password) return;
            mutate(restData);
          }}
          className="p-2  bg-blue-900 text-white hover:bg-blue-800 border-none"
        />
      </form>
    </div>
  );
};

export default ConfirmResetPassword;
