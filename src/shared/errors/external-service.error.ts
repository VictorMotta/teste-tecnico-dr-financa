import httpStatus from "http-status";
import { AppError } from "./app-error";

export class ExternalServiceError extends AppError {
  constructor(message = "External service error") {
    super(message, httpStatus.SERVICE_UNAVAILABLE, "ExternalServiceError");
  }
}