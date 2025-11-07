import { Request, Response, NextFunction } from "express";
import { ErrorRequestHandler } from "../types.js";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  const status =
    err && ("status" in err || "statusCode" in err)
      ? (err as any).status || (err as any).statusCode
      : 500;
  res.status(status).json({
    error: status === 500 ? "Internal Server Error" : err.name || "Error",
    message: err && err.message ? err.message : "An unexpected error occurred",
  });
};
