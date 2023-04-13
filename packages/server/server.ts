import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { renderTrpcPanel } from 'trpc-panel';
import { appRouter } from './trpc';

const app = express();

app.use(cors());

app.get('/api', (req, res) => {
  res.send({ message: 'Hello World!' });
});

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
);

app.use('/panel', (_, res) => {
  return res.send(renderTrpcPanel(appRouter, { url: `http://localhost:3000/trpc`, transformer: 'superjson' }));
});

app.listen(3000, () => {
  console.log(`Server listening on http://localhost:3000`);
});
