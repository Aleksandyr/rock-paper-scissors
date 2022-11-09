import { NextFunction, Request, Response } from 'express';
import { stat } from 'fs';

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
      const { result } = req.body;
      const user = await User.findByPk((req?.user as UserInterface)?.id, { include: [Stats] });
      const stats = user?.stats;

      switch (result) {
        case 0:
          await stats?.increment('draws');
          break;
        case 1:
          await stats?.increment('wins');
          break;
        case 2:
          await stats?.increment('losses');
          break;
        default:
          break;
      }

      const updatedStats = await Stats?.findByPk(user?.stats.id);
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
