import { PrismaClient } from "@prisma/client";

import BcryptService from "../infra/BcryptService";
import UserService from "./UserService";
import TokenService from "../infra/TokenService";

import { AppError } from "../exceptions/AppException";

import {
  LoginCredentialsInterface,
  RegisterCredentialsInterface,
} from "../types/AuthCredentialsInterface";

export default class AuthService {
  private db = new PrismaClient();
  private bcryptService = new BcryptService();
  private userService = new UserService();
  private tokenService = new TokenService();

  async login(loginCredentials: LoginCredentialsInterface) {
    this.validateLoginFields(loginCredentials);

    const { password, ...loggedUser } = await this.userService.getUserByEmail(
      loginCredentials.email
    );

    const passwordMatches = await this.bcryptService.passwordMatcher(
      loginCredentials.password,
      password
    );
    if (!passwordMatches) throw new AppError("Credenciais inválidas!", 422);

    const token = this.tokenService.generateToken(loggedUser.id);

    return {
      token,
      loggedUser,
    };
  }

  async register(registerCredentials: RegisterCredentialsInterface) {
    this.validateRegisterFields(registerCredentials);

    const isEmailAlreadyRegistered = await this.userService.userExistsByEmail(
      registerCredentials.email
    );
    if (isEmailAlreadyRegistered)
      throw new AppError("Email já cadastrado", 422);

    const { passwordHash } = await this.bcryptService.generateHashedPassword(
      registerCredentials.password
    );

    const { password, ...createdUser } = await this.db.user.create({
      data: {
        email: registerCredentials.email,
        name: registerCredentials.name,
        password: passwordHash,
      },
    });

    return createdUser;
  }

  private validateLoginFields({ email, password }: LoginCredentialsInterface) {
    if (!email) throw new AppError("Campo 'email' é obrigatório!", 422);

    if (!password) throw new AppError("Campo 'senha' é obrigatório!", 422);
  }

  private validateRegisterFields(credentials: RegisterCredentialsInterface) {
    const { email, name, password, passwordConfirmation } = credentials;

    if (!email) throw new AppError("Campo 'email' é obrigatório!", 422);
    if (!name) throw new AppError("Campo 'nome' é obrigatório!", 422);
    if (!password) throw new AppError("Campo 'senha' é obrigatório!", 422);
    if (password !== passwordConfirmation)
      throw new AppError("Senhas não condizem", 422);
    return;
  }
}
