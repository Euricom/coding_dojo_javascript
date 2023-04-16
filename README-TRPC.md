# CODING DOJO - Javascript tRPC

A quick start for tRPC.

### Install dependencies

```bash
# for server
yarn add @trpc/server zod

# for client
yarn add @trpc/client @trpc/react-query @tanstack/react-query
```

### Create your first router

Create a router instance

```ts
import { initTRPC } from '@trpc/server';
 
const t = initTRPC.create();
  
const appRouter = t.router({});
```

Add a procedure

```ts
export const appRouter = t.router({
  getAll: t.procedure.query((req) => {
    return [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];
  }),
});
```

Map to a express route

```ts
// server.ts
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
);
```

### Add UI Panel
Easy for testing & documenting your tRPC API

```bash
yarn add trpc-panel
```

```ts
import { renderTrpcPanel } from "trpc-panel";
// ...
app.use("/panel", (_, res) => {
  return res.send(
    renderTrpcPanel(myTrpcRouter, { url: `http://localhost:3000/trpc` })
  );
});
```

### Add procedure with argument

```ts
// Zod validation schema
const schema = z.object({ 
  id: z.string().describe('The user id'),
})

getById: t.procedure.input(schema).query(({ input }) => {
  return userList.find((user) => user.id === input.id);
}),
```

### Use in the client

Create the trpc client

```ts
// ./client/src/trpc.ts
import type { AppRouter } from '@euricom/trpc-server';
import { createTRPCReact } from '@trpc/react-query';

// Notice the <AppRouter> generic here.
const tRPC = createTRPCReact<AppRouter>({});

export default tRPC;
```

Make the router type available for the client

```ts
// ./server/trpc.ts
export type AppRouter = typeof appRouter;
```

```json
{
  "name": "@euricom/trpc-server",
  "types": "trpc.ts",
}
```

Add the trpc & react-query client

```tsx
// App.tsx
const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
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
        <UserList />
      </QueryClientProvider>
    </trpc.Provider>
  );
};
```

Use the trpc client

```tsx
// UserList.tsx
const UserList = () => {
  const { data } = tRPC.getAll.useQuery();
  return (
    <div>
      <h1>UserList</h1>
      {JSON.stringify(data)}
    </div>
  );
};
```

### Add data transformation

Lets add a date 

```ts
type User {
  id: string;
  name: string;
  age: number;
  born?: Date;
}
```

```ts
const { data } = tRPC.getAll.useQuery();
type X = typeof data[0].born   // string | undefined
```

Add a transformer

```ts
// ./server/trpc.ts
import superjson from 'superjson';

const t = initTRPC.create({
  transformer: superjson,
});
```

```ts
// ./client/src/trpc.ts
import superjson from 'superjson';

const trpcClient = trpc.createClient({
  transformer: superjson,
  // ...
})
```

```ts
const { data } = tRPC.getAll.useQuery();
type X = typeof data[0].born   // Date | undefined !!!!!!
```

### Mutation

Server

```ts
export const appRouter = t.router({
  // ...
  createUser: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      const user: User = {
        id: `${Math.random()}`,
        name: input.name,
      };
      userList.push(user);
      return user;
    }),
```

Client

```tsx
const { data, mutate: createUser } = trpc.userCreate.useMutation();
createUser({ name: 'John' });
```

### Extra Information

- [tRPC](https://trpc.io/)
- [tRPC - Error Handling](https://trpc.io/docs/server/error-handling)
- [superjson](https://github.com/blitz-js/superjson)
- [trpc-panel](https://github.com/iway1/trpc-panel)
- [template-next-t3-mongodb](https://github.com/cosemansp/template-next-t3-mongodb)
- [trpc-openapi](https://www.npmjs.com/package/trpc-openapi)
- [tRPC with Angular](https://medium.com/anymind-group/full-stack-typesscript-with-trpc-ft-angular-93ffc52685a5)
