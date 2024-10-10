import { SignIn } from '@clerk/clerk-react';
import { privateUrls, publicUrls } from '../../routes/urls';

const SignInClerk = () => {
  return (
    <SignIn
      forceRedirectUrl={privateUrls.HOME}
      signUpUrl={publicUrls.SING_UP}
      path={publicUrls.SIGN_IN}
      appearance={{
        layout: { unsafe_disableDevelopmentModeWarnings: true },
        elements: {
          formButtonPrimary: 'bg-slate-500 hover:bg-slate-400 text-sm',
        },
      }}
    />
  );
};

export default SignInClerk;
