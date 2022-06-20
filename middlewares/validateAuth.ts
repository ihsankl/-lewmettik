/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { generalConfig as config } from "../src/config";
interface RequestWithUser extends Request {
  user: string | JwtPayload | undefined;
}

export const checkIfAuthenticated = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token)
    return res.status(401).json({
      mensaje: 'No token provided',
      status: 401,
    });

  jwt.verify(token, config.API_KEY_JWT, (err, decoded) => {
    if (err)
      return res.status(401).json({ mensaje: 'Invalid token', status: 401 });
    req.user = decoded;
    next();
  });
};