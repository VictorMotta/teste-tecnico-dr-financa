import httpStatus from "http-status";
import { AppError } from "./app-error";

export class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, httpStatus.NOT_FOUND, "NotFoundError");
  }
}