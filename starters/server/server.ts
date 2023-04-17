import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/api', (req, res) => {
  res.send({ message: 'Hello World!' });
});

app.listen(3000, () => {
  console.log(`Server listening on http://localhost:3000`);
});
