import express from 'express';
import morgan from 'morgan';
import { checkAuth } from './checkAuth.js';
import { usersRouter } from './routers/usersRouter.js';
import cookieParser from 'cookie-parser';
import { authRouter } from './routers/authRouter.js';
import { surveysRouter } from './routers/surveysRouter.js';
import { surveysFilterRouter } from './routers/surveysFilterRouter.js';

const PORT = 3005;
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/api/v1/users', usersRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1/surveys', surveysRouter);
app.use('/api/v1/surveysfilters', surveysFilterRouter);
//для перехода на защищенную страницу
app.get('/api/v1/secret', checkAuth, (req, res) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log('server is running');
});
