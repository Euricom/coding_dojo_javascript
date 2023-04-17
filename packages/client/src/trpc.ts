import type { AppRouter } from '@euricom/trpc-server';
import { createTRPCReact } from '@trpc/react-query';
import superjson from 'superjson';

// Notice the <AppRouter> generic here.
const tRPC = createTRPCReact<AppRouter>({});

export default tRPC;
