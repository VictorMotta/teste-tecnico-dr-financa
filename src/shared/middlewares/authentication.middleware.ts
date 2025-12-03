import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { caseInsensitiveObject } from "../utils";
import { UnauthorizedError } from "../errors";


dotenv.config();

export async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const headers = req.headers;
  const newHeaders = caseInsensitiveObject(headers, (key) => key.toLowerCase());
  const apiKeyHeader = newHeaders["authorization"];
  const expectedApiKey = process.env.EXPECTED_API_KEY || 'teste123';

  if(!apiKeyHeader || apiKeyHeader !== expectedApiKey) throw new UnauthorizedError("Invalid token or missing authorization header"); 

  return next();
}


