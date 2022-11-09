import { Request } from 'express';
import { UserInterface } from '.'

declare global {
  namespace Express {
    class User implements UserInterface {
      id: number;
      email: string;
      username: string;
    }
  }
}

export interface RequestWithUser extends Request { user: Express.User }
