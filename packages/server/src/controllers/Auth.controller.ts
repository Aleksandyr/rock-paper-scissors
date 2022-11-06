import { NextFunction, Request, Response } from "express";

export const login = async (req: Request, res: Response, next: NextFunction) => res.sendStatus(200);