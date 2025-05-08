import { PrismaClient } from "@prisma/client";
import { AppError } from "../exceptions/AppException";

export default class UserService {
  private db = new PrismaClient();

  async getUserById(id: number) {}

  async userExistsByEmail(email: string) {
    return await this.db.user.findUnique({
      where: { email },
    });
  }

  async getUserByEmail(email: string) {
    const userFound = await this.db.user.findUnique({
      where: { email },
    });

    if (!userFound) throw new AppError("Usuário não encontrado!", 404);

    return userFound;
  }
}
