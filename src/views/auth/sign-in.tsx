import { useState } from 'react';
import Input from '../../components/forms/Input';
import { IUser } from '../../@types/user';
import { useI18n } from '../../services/languages/i18fn';
import Button from '../../components/ui/button';
import { useSignWithEmail } from '../../services/mutations/user-auth';
import { useNavigate } from 'react-router-dom';
import { privateUrls, publicUrls } from '../../routes/urls';
import { defaultUser } from '../../utils/constant/defaultData';
import { toast } from 'react-toastify';
import { errorTransform } from 'src/utils/methods/helpers';
import GoogleIcon from 'src/constants/svgs/google';
import AppleIcon from 'src/constants/svgs/apple';

const SignInClerk = () => {
  const [user, setUser] = useState<IUser>(defaultUser);
  const i18n = useI18n();
  const navigate = useNavigate();
  const { mutate, isPending } = useSignWithEmail({
    onSuccess: (data) => {
      if (data) {
        navigate(privateUrls.HOME);
      }
    },
    onError: (err) => {
      toast(errorTransform(err.message), { type: 'error' });
    },
  });

  return (
    <div className=" text-white">
      <div className="text-center mt-4 mb-6">
        <h3 className="text-2xl">{i18n.msg('LOGIN_TO_YOUR_ACCOUNT')}</h3>
        <p className="text-sm">{i18n.msg('WELCOME_BACK')}</p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
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
        <div>
          <Input
            required
            id="password"
            type="password"
            labelClass="text-white"
            label={i18n.msg('PASSWORD')}
            wrapperClass="mb-3 mx-3 text-black"
            value={user?.password as string}
            onChange={({ target }) => setUser((prev) => ({ ...prev, password: target.value }))}
            placeholder={i18n.msg('PASSWORD')}
          />
          <p className="text-xs flex justify-end mr-3 hover:text-purple-900">
            <button type="button" onClick={() => navigate(publicUrls.FORGOT_PASSWORD)}>
              Forgot password?
            </button>
          </p>
        </div>
        <Button
          type="submit"
          isLoading={isPending}
          wrapperClass="mt-6 mx-3"
          label={i18n.msg('LOGIN')}
          onClick={() => mutate(user as any)}
          className="p-2  bg-blue-900 text-white hover:bg-blue-800 border-none"
        />
      </form>
      <div className="flex justify-between items-center gap-3 mx-5 my-5">
        <hr className="w-full" /> or <hr className="w-full" />
      </div>
      <div className="flex justify-between space-x-4 mx-3">
        <Button
          label=""
          icon={() => <AppleIcon />}
          iconPre
          onClick={() => console.log('Apple')}
          wrapperClass="w-full"
          className="w-full p-1 shadow-inner  hover:bg-slate-100"
        />
        <Button
          label=""
          onClick={() => console.log('Google')}
          icon={() => <GoogleIcon />}
          iconPre
          wrapperClass="w-full"
          className="w-full p-1 shadow-inner  hover:bg-slate-100"
        />
      </div>
      <div className="text-center my-6">
        <p>
          {i18n.msg('DONT_HAVE_ACCOUNT')}{' '}
          <button className="text-white hover:text-purple-900" onClick={() => navigate(publicUrls.SING_UP)}>
            {i18n.msg('SIGNUP')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInClerk;
