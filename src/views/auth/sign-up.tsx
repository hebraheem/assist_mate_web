import { useState } from 'react';
import Input from '../../components/forms/Input';
import { defaultUser } from '../../utils/constant/defaultData';
import { IUser } from '../../@types/user';
import { useI18n } from '../../services/languages/i18fn';
import Button from '../../components/ui/button';
import { useCreateWithEmail } from '../../services/mutations/user-auth';
import { useNavigate } from 'react-router-dom';
import { privateUrls, publicUrls } from '../../routes/urls';
import { toast } from 'react-toastify';
import { errorTransform } from 'src/utils/methods/helpers';
import AppleIcon from 'src/constants/svgs/apple';
import GoogleIcon from 'src/constants/svgs/google';

const SignUpClerk = () => {
  const [user, setUser] = useState<IUser>(defaultUser);
  const i18n = useI18n();
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateWithEmail({
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
    <div className="text-white">
      <div className="text-center mt-4 mb-6">
        <h3 className="text-2xl">{i18n.msg('CREATE_ACCOUNT')}</h3>
        <p className="text-sm">{i18n.msg('WELCOME_NOTE')}</p>
      </div>
      <div className="flex justify-between items-center mb-3 mx-3 gap-3">
        <Button
          label=""
          icon={() => <AppleIcon />}
          iconPre
          onClick={() => console.log('Apple')}
          wrapperClass="w-full"
          className="w-full p-1 shadow-inner hover:bg-slate-100"
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
      <div className="flex justify-between items-center gap-3 mx-5 mb-3">
        <hr className="w-full" /> or <hr className="w-full" />
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex justify-between mx-3 items-center gap-3 mb-3">
          <Input
            required
            id="firstName"
            labelClass="text-white"
            wrapperClass="w-full text-black"
            label={i18n.msg('FIRST_NAME')}
            value={user?.firstName as string}
            onChange={({ target }) => setUser((prev) => ({ ...prev, firstName: target.value }))}
            placeholder={i18n.msg('FIRST_NAME')}
          />
          <Input
            required
            id="lastName"
            labelClass="text-white"
            wrapperClass="w-full text-black"
            label={i18n.msg('LAST_NAME')}
            value={user?.lastName as string}
            onChange={({ target }) => setUser((prev) => ({ ...prev, lastName: target.value }))}
            placeholder={i18n.msg('LAST_NAME')}
          />
        </div>
        <Input
          required
          id="username"
          labelClass="text-white"
          label={i18n.msg('USERNAME')}
          wrapperClass="mb-3 mx-3 text-black"
          value={user?.username as string}
          onChange={({ target }) => setUser((prev) => ({ ...prev, username: target.value }))}
          placeholder={i18n.msg('USERNAME')}
        />
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
        <Button
          type="submit"
          isLoading={isPending}
          wrapperClass="mt-6 mx-3 text-black"
          label={i18n.msg('CREATE_USER_ACCOUNT')}
          onClick={() => {
            if (!user.email || !user.password || !user.firstName || !user.lastName || !user.username) return;
            mutate(user as any);
          }}
          className="p-2  bg-blue-900 text-white hover:bg-blue-800 border-none"
        />
      </form>
      <div className="text-center my-6">
        <p>
          {i18n.msg('ALREADY_ACCOUNT')}{' '}
          <button className="text-white hover:text-purple-900" onClick={() => navigate(publicUrls.SIGN_IN)}>
            {i18n.msg('SIGNIN')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpClerk;
