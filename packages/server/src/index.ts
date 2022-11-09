import express from 'express';
import session from 'express-session';
import connSessSeq from 'connect-session-sequelize';
import morgan from 'morgan';

import { passport } from './middleware';
import { AuthRouter, UserRouter } from './routes';
import { Sequelize } from 'sequelize';

(async () => {
  const sessionKey = process.env.SESSION_KEY || '44e257001e5e64b08ece15c828c00bae9de6aaf3';
  const SequelizeStore = connSessSeq(session.Store);
  const dbSessions = new Sequelize({ logging: false, dialect: "sqlite", storage: "./session.sqlite" });

  await dbSessions.sync();
  const store = new SequelizeStore({ db: dbSessions });

  const port = 3200;
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());

  app.use(session({ secret: sessionKey, resave: true, saveUninitialized: false, store }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/auth', AuthRouter);
  app.use('/users', UserRouter);

  app.get('/test', (req, res) => {
    res.send({ data: 'Hello from the server' });
  });

  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
})();

