import { NextFunction, Request, Response } from "express";

export const getGeoip = async (req: Request, res: Response, next: NextFunction) => {
  req.requestInfo = {
    userData: {
      ip: req.ipInfo.ip,
      city: req.ipInfo.city,
      country: req.ipInfo.country,
      region: req.ipInfo.region,
    },
    method: req.method,
    originalUrl: req.originalUrl,
  };
  next();
};