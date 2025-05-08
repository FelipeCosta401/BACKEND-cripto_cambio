import { Request, Response, NextFunction } from "express";

import TokenService from "../infra/TokenService";

import { AppError } from "../exceptions/AppException";

const tokenService = new TokenService();

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const headers = req.headers.authorization;
  if (!headers || !headers.startsWith("Bearer "))
    throw new AppError("Usuário não autenticado!", 401);

  const token = headers.split(" ")[1];
  const { userId } = tokenService.verifyToken(token);

  req.user = {
    id: userId,
  };

  next();
}