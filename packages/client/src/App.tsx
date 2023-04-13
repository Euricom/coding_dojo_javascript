import React, { useState } from 'react';
import superjson from 'superjson';
import UserList from './components/UserLIst';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import trpc from './trpc';

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

const App: React.FC = () => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto mt-2">
          <h1 className="text-3xl font-bold underline">Hello tRPC</h1>
          <p>And tailwind, and React</p>
          <UserList />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
