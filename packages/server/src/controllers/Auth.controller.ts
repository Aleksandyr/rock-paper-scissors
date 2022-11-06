import { NextFunction, Request, Response } from "express";

export const logout = async (req: Request, res: Response, next: NextFunction) => req.logout((err) => {
    if (!err) {
        return res.sendStatus(200);
    }
    return next(err);
});
export const login = async (req: Request, res: Response, next: NextFunction) => res.sendStatus(200);