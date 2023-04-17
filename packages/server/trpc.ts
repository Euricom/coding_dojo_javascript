import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { z } from 'zod';

const t = initTRPC.create({
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
    console.log('get all users');
    return userList;
  }),
  getById: t.procedure.input(schema).query(({ input }) => {
    console.log('get user by id', input.id);
    return userList.find((user) => user.id === input.id);
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string(), age: z.number().optional(), born: z.date() }))
    .mutation(({ input }) => {
      const newUserId = userList.reduce((acc, user) => Math.max(acc, parseInt(user.id, 10)), 0) + 1;
      const user: User = {
        id: newUserId.toString(),
        name: input.name,
        age: input.age,
        born: input.born,
      };
      userList.push(user);
      console.log('create user', user);
      return user;
    }),
});

export type AppRouter = typeof appRouter;
