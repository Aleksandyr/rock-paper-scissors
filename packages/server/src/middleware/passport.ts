import passport from 'passport';
import { Strategy } from 'passport-local';
import { NextFunction, Request, Response } from 'express';

import { User, db } from '../db';
import { RequestWithUser } from '../types/Express';

const strategy = new Strategy(async (username, password, done) => {
  try {
    const reqUser = await User.findOne({
      where: db.Sequelize.where(
        db.Sequelize.fn('lower', db.Sequelize.col('username')),
        db.Sequelize.fn('lower', username)
      )
    });

    if (!reqUser) {
      return done(null, false, { message: `No user found with ${username}` });
    }

    const isValidPassword = reqUser.comparePassword(password);
    if (!isValidPassword) {
      return done(null, false, { message: "Password you've entered was invalid" });
    }

    const user: Express.User = { id: reqUser.id, email: reqUser.email, username: reqUser.username }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

passport.serializeUser<Express.User>((user, done) => done(null, user));
passport.deserializeUser<Express.User>((user, done) => done(null, user));

passport.use(strategy);

const withAuth =
  (req: Request, res: Response, next: NextFunction) =>
    async (cb: (req: RequestWithUser, res: Response, next: NextFunction) => any) => {
      if (!req.isAuthenticated())
        return res.status(401).send('You must be logged in to use this endpoint');
      return await cb(req, res, next);
    };

export { passport, withAuth };
