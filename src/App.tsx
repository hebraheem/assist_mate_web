import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Suspense } from 'react';

import ErrorBoundary from './components/error-boundary';

function App() {
  return (
    <Suspense fallback="loading...">
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
