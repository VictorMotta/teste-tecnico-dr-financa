export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number, name?: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = name ?? new.target.name;

    Error.captureStackTrace?.(this, this.constructor);
  }
}