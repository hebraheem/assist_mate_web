import { SignUp } from '@clerk/clerk-react';
import React from 'react';
import { privateUrls, publicUrls } from '../../routes/urls';

const SignUpClerk = () => {
  return (
    <SignUp
      forceRedirectUrl={privateUrls.HOME}
      signInUrl={publicUrls.SIGN_IN}
      path={publicUrls.SING_UP}
      appearance={{
        elements: {
          formButtonPrimary: 'bg-slate-500 hover:bg-slate-400 text-sm',
        },
      }}
    />
  );
};

export default SignUpClerk;
