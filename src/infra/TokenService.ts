import jwt from "jsonwebtoken";

import { AppError } from "../exceptions/AppException";

export default class TokenService {
  private secretKey = process.env.TOKEN_SECRET;

  generateToken(userId: number) {
    if (!this.secretKey)
      throw new AppError(
        "Houve um erro interno na autenticação, lamentamos!",
        500
      );

    return jwt.sign(
      {
        userId,
      },
      this.secretKey
    );
  }

  verifyToken(token: string) {
    if (!this.secretKey)
      throw new AppError(
        "Houve um erro interno na autenticação, lamentamos!",
        500
      );

    try {
      return jwt.verify(token, this.secretKey) as { userId: number };
    } catch (e) {
      throw new AppError("Token expirado ou inválido ", 401);
    }
  }
}
