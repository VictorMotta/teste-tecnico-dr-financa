import httpStatus from "http-status";
import { AppError } from "./app-error";

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, httpStatus.CONFLICT, "ConflictError");
  }
}