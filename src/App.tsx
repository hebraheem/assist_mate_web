import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Suspense } from 'react';

import ErrorBoundary from './components/error-boundary';

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen w-full">
          Loading...
        </div>
      }
    >
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
