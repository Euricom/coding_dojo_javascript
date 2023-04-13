import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { OpenApiMeta } from 'trpc-openapi';
import { z } from 'zod';

const t = initTRPC.meta<OpenApiMeta>().create({
  transformer: superjson,
});

interface User {
  id: string;
  name: string;
  age?: number;
  born?: Date;
}

const userList: User[] = [
  {
    id: '1',
    name: 'KATT',
    age: 12,
    born: new Date(),
  },
  {
    id: '2',
    name: 'KATT2',
    age: 87,
    born: new Date(),
  },
];

const schema = z.object({
  id: z.string().describe('The user id'),
});

export const appRouter = t.router({
  getAll: t.procedure.input(z.void()).query(() => {
    return userList;
  }),
  getById: t.procedure.input(schema).query(({ input }) => {
    return userList.find((user) => user.id === input.id);
  }),
  createUser: t.procedure.input(z.object({ name: z.string(), age: z.number().optional() })).mutation(({ input }) => {
    const user: User = {
      id: `${Math.random()}`,
      name: input.name,
      age: input.age,
    };
    userList.push(user);
    return user;
  }),
});

export type AppRouter = typeof appRouter;
