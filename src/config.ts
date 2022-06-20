// require('dotenv').config();
// convert to newer syntax
import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

interface IConfig {
  port: number;
  dbUrlMongoDB?: string;
  API_KEY_JWT: jwt.Secret | jwt.GetPublicKeyOrSecret;
  TOKEN_EXPIRES_IN?: string;
}

export const generalConfig: IConfig = {
  port: 5000,
  dbUrlMongoDB: process.env.dbUrlMongoDB,
  API_KEY_JWT: process.env.API_KEY_JWT as jwt.Secret | jwt.GetPublicKeyOrSecret,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
};
