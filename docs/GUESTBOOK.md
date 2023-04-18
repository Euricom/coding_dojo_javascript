# CODING DOJO - Guestbook exercise

This is the major exercise to build with the T3 Stack.
We are going to build a simple guest book application, with DB access via Prisma, and API with tRPC and NextAuth for the authentication.

## Requirements

- Create a new T3 App 
- Create a guestbook database to hold the messages
  - Use postgres as DB
- Create tRPC router for adding and removing messages
- Add an TRPC panel for easy testing
- Create a simple page with
  - Simple form (message + submit button)
  - List of message 
  - Remove an message
- Authentication with Google
  - Use the DB integration of NextAuth to store the user
- Add like/unlike functionality for logged in users 
  - Extend your DB with a like table

Optional
- Add optimistic UI for like/unlike
- Add a comment functionality for logged in users
- Add integration tests for your router 

## Hints

- Use the `create-t3-app` to create a new app
  
- Use [tRPC Panel - Next](https://github.com/iway1/trpc-panel#nextjs--create-t3-app-example) to test your tRPC router

```ts
import type { NextApiRequest, NextApiResponse } from "next";
import { renderTrpcPanel } from "trpc-panel";
import { appRouter } from "../../server/api/root";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).send(
    renderTrpcPanel(appRouter, {
      url: "http://localhost:3000/api/trpc",
      transformer: "superjson",
    })
  );
}
```

- Use following code to create the simple form

```tsx
const [message, setMessage] = useState("");
const MyForm = () =>
  return (
    <form onSubmit={(event) => {
          event.preventDefault();
          console.log(message);
    }}>
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
    </form>
  );
}
```

- for the like/unlike functionality you probably need a many to many relation in your DB. See the following documentation how to do this: 

https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations#explicit-many-to-many-relations

- For optimistic update you can access the cache directly with trpc.useContext and use the `setData` method.

```tsx
const trpcContext = api.useContext();

const { mutate: like } = api.guestbook.likeMessage.useMutation({
    // optimistic update
    onMutate: async (newEntry) => {
      trpcContext.guestbook.getAll.setData(undefined, (cachedEntries) => {
        //
        // update the cache directly here
        //
        return updatedEntries;
      })
    }
});
```

Because tRPC is build on top of react-query you can also have a look at the following 
https://tanstack.com/query/v4/docs/react/guides/optimistic-updates#updating-a-list-of-todos-when-adding-a-new-todo

- Use the tRPC `publicProcedure` for anonymous access and `protectedProcedure` to protect your routes

- Use the `appRouter.createCaller(ctx)` to call you router directly for integration testing. See also the following example: [Integration testing with Jest and tRPC](https://github.com/trpc/examples-next-prisma-starter/blob/main/src/server/routers/post.test.ts). And see [template-next-t3-mongodb](https://github.com/cosemansp/template-next-t3-mongodb) for a complete example on integration testing and MongoDB.

## Useful resources

- [Google authentication with Next Auth](https://next-auth.js.org/providers/google)

