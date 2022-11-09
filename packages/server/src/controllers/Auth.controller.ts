import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User, db, Stats } from '../db';
import passport from 'passport';
import { AuthController } from '.';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, confirmPassword, password } = req.body;

    if (!username || username.length < 3 || username.length > 10)
      return res.status(400).send({
        success: false,
        message: `You must provide a username that is between 3 and 10 characters long!`
      });

    if (!password || password.length < 6 || password.length > 40)
      return res.status(400).send({
        success: false,
        message: `You must provide a password that is between 6 and 40 characters long!`
      });

    if (password !== confirmPassword)
      return res
        .status(400)
        .send({ success: false, message: `The passwords that you've provided doesn't match!` });

    const user = await User.findOne({
      where: db.Sequelize.where(
        db.Sequelize.fn('lower', db.Sequelize.col('username')),
        db.Sequelize.fn('lower', username)
      )
    });

    if (user)
      return res
        .status(400)
        .send({ success: false, message: `The provided username already exists!` });

    const hashedPass = bcrypt.hashSync(password, 10);
    const newUser = await User.create(
      { username, email, password: hashedPass, stats: { wins: 0, draws: 0, losses: 0 } },
      { include: [Stats] }
    );

    // passport.authenticate('local', AuthController.login);
    return res.send(newUser);
  } catch (err) {
    return next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) =>
  req.logout((err) => {
    if (!err) {
      return res.sendStatus(200);
    }
    return next(err);
  });

export const login = (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.headers.cookie || '';
  res.setHeader('cookie', cookie).sendStatus(200);
};
