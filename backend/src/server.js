import express from 'express';
import morgan from 'morgan';
import { usersRouter } from './routers/usersRouter.js';

const PORT = 3005;
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/users', usersRouter);

app.listen(PORT, () => {
  console.log('server is running');
});
