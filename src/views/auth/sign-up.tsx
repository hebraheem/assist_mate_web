import { useState } from 'react';
import Input from '../../components/forms/Input';
import { defaultUser } from '../../utils/constant/defaultData';
import { IUser } from '../../@types/user';
import { useI18n } from '../../services/languages/i18fn';
import Button from '../../components/ui/button';
import { useCreateWithEmail } from '../../services/mutations/user-auth';
import { useNavigate } from 'react-router-dom';
import { privateUrls, publicUrls } from '../../routes/urls';

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
      alert(err.message);
    },
  });

  return (
    <div>
      <div className="text-center mt-4 mb-6">
        <h3 className="text-2xl">{i18n.msg('CREATE_ACCOUNT')}</h3>
        <p className="text-sm">{i18n.msg('WELCOME_NOTE')}</p>
      </div>
      <div className="flex justify-between items-center mb-3 mx-3 gap-3">
        <Button label="Apple" onClick={() => console.log('Google')} wrapperClass="w-full" className="w-full p-1" />
        <Button label="Google" onClick={() => console.log('Apple')} wrapperClass="w-full" className="w-full p-1" />
      </div>
      <div className="flex justify-between items-center gap-3 mx-5 mb-3">
        <hr className="w-full" /> or <hr className="w-full" />
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex justify-between mx-3 items-center gap-3 mb-3">
          <Input
            required
            id="firstName"
            wrapperClass="w-full"
            label={i18n.msg('FIRST_NAME')}
            value={user?.firstName as string}
            onChange={({ target }) => setUser((prev) => ({ ...prev, firstName: target.value }))}
            placeholder={i18n.msg('FIRST_NAME')}
          />
          <Input
            required
            id="lastName"
            wrapperClass="w-full"
            label={i18n.msg('LAST_NAME')}
            value={user?.lastName as string}
            onChange={({ target }) => setUser((prev) => ({ ...prev, lastName: target.value }))}
            placeholder={i18n.msg('LAST_NAME')}
          />
        </div>
        <Input
          required
          id="username"
          label={i18n.msg('USERNAME')}
          wrapperClass="mb-3 mx-3"
          value={user?.username as string}
          onChange={({ target }) => setUser((prev) => ({ ...prev, username: target.value }))}
          placeholder={i18n.msg('USERNAME')}
        />
        <Input
          required
          id="email"
          type="email"
          label={i18n.msg('EMAIL')}
          wrapperClass="mb-3 mx-3"
          value={user?.email as string}
          onChange={({ target }) => setUser((prev) => ({ ...prev, email: target.value }))}
          placeholder={i18n.msg('EMAIL')}
        />
        <Input
          required
          id="password"
          type="password"
          label={i18n.msg('PASSWORD')}
          wrapperClass="mb-3 mx-3"
          value={user?.password as string}
          onChange={({ target }) => setUser((prev) => ({ ...prev, password: target.value }))}
          placeholder={i18n.msg('PASSWORD')}
        />
        <Button
          type="submit"
          isLoading={isPending}
          wrapperClass="mt-6 mx-3"
          label={i18n.msg('CREATE_USER_ACCOUNT')}
          onClick={() => mutate(user as any)}
          className="p-1  bg-slate-500 text-white hover:bg-slate-400"
        />
      </form>
      <div className="text-center my-6">
        <p>
          {i18n.msg('ALREADY_ACCOUNT')}{' '}
          <button className="text-blue-500" onClick={() => navigate(publicUrls.SIGN_IN)}>
            {i18n.msg('SIGNIN')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpClerk;
