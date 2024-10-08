import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
