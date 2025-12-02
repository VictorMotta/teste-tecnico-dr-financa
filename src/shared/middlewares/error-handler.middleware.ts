import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";
import httpStatus from "http-status";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    error: "InternalServerError",
    message: "Unexpected internal server error",
  });
}