import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Suspense } from 'react';

import ErrorBoundary from './components/error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });

  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen w-full">Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
