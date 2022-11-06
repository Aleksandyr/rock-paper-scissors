import express from 'express';
import session from 'express-session';
import morgan from 'morgan';

import { passport } from './middleware';
import { AuthRouter } from './routes';

const sessionKey = process.env.SESSION_KEY || '44e257001e5e64b08ece15c828c00bae9de6aaf3';

const port = 3200;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(session({secret: sessionKey, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', AuthRouter);

app.get('/test', (req, res) => {
  res.send({ data: 'Hello from the server' });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

