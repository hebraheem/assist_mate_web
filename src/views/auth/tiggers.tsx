import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ACTION_MODE } from 'src/constants/enum';
import ConfirmResetPassword from './confirm-reset-password';
import EmailVerified from './email-verified';

const Triggers = () => {
  const [mode, setMode] = useState('');
  const location = useLocation();

  useEffect(
    () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('mode') as string;
      setMode(code);
    },
    // eslint-disable-next-line
    [location, mode]
  );

  if (mode === ACTION_MODE.RESET_PASSWORD) {
    return <ConfirmResetPassword />;
  }
  if (mode === ACTION_MODE.VERIFY_EMAIL) {
    return <EmailVerified />;
  }

  return <p>Pls specify a form to load</p>;
};

export default Triggers;
