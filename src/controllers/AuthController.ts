import { Request, Response } from "express";

import AuthService from "../services/AuthService";

const authService = new AuthService();

async function login(req: Request, res: Response) {
  const { loggedUser, token } = await authService.login(req.body);
  res.status(200).json({
    message: "Auternticado com sucesso!",
    loggedUser,
    token
  });
}

async function register(req: Request, res: Response) {
  const createdUser = await authService.register(req.body);

  res.status(201).json({
    message: "Usuário criado com sucesso!",
    createdUser,
  });
}

export { login, register };
