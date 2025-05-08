import { Request, Response, NextFunction } from "express";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Erro interno no servidor";

  res.status(statusCode).json({ error: message });
}
