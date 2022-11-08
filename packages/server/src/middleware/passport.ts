import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import jwt from 'jsonwebtoken';

import { User } from '../db';
import { UserInterface } from '../types';

const strategy = new Strategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return done(null, user, { message: `No user found with ${username}` });
    }

    const isValidPassword = user?.comparePassword(password);
    if (!isValidPassword) {
      return done(null, user, { message: "Password you've entered was invalid" });
    }

    // const token = jwt.sign({foo: 'foo'}, 'asd');
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

passport.serializeUser<UserInterface>((user, done) => done(null, user));
passport.deserializeUser<UserInterface>((user, done) => done(null, user));

passport.use(strategy);

const withAuth =
  (req: Request, res: Response, next: NextFunction) =>
  async (cb: (req: Request, res: Response, next: NextFunction) => any) => {
    if (!req.isAuthenticated())
      return res.status(401).send('You must be logged in to use this endpoint');
    return await cb(req, res, next);
  };

export { passport, withAuth };
