import { NextFunction, Request, Response } from 'express';

import { Stats, User } from '../db';
import { withAuth } from '../middleware/passport';
import { UserInterface } from '../types';

export const updateUserStats = async (req: Request, res: Response, next: NextFunction) => {
  return await withAuth(
    req,
    res,
    next
  )(async (req, res, next) => {
    try {
      const { wins, losses, draws } = req.body;
      const user = await User.findByPk((req?.user as UserInterface)?.id, { include: [Stats] });
      const updatedStats = await user?.stats.update({ wins, losses, draws });
      res.send(updatedStats);
    } catch (e) {
      return next(e);
    }
  });
};

const currentUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk((req?.user as UserInterface)?.id, { include: [Stats] });
    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) =>
  await withAuth(req, res, next)(currentUserInfo);
