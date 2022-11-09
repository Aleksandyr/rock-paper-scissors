import { NextFunction, Request, Response } from 'express';

import { Stats, User } from '../db';
import { withAuth } from '../middleware/passport';
import { getRandomValue } from '../utils/utils';

export const updateUserStats = async (req: Request, res: Response, next: NextFunction) => withAuth(req, res, next)(async (req, res, next) => {
  try {
    const { userMove } = req.body;
    const [stats] = await Stats.findOrCreate({ where: { userId: req.user.id } });

    const computerMove = getRandomValue();
    const winner = (3 + userMove - computerMove) % 3

    switch (winner) {
      case 0:
        await stats.increment('draws');
        break;
      case 1:
        await stats.increment('wins');
        break;
      case 2:
        await stats.increment('losses');
        break;
      default:
        break;
    }

    await stats.reload();
    const result = {
      computerMove,
      winner,
      stats
    };

    return res.send(result);
  } catch (e) {
    return next(e);
  }
});

export const getMe = async (req: Request, res: Response, next: NextFunction) => withAuth(req, res, next)(async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, { include: [Stats] });
    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
});