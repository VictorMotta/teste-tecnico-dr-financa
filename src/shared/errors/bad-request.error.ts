import httpStatus from "http-status";
import { AppError } from "./app-error";

export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, httpStatus.BAD_REQUEST, "BadRequestError");
  }
}