import bcrypt from "bcrypt";

export default class BcryptService {
  async generateHashedPassword(password: string) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    return { passwordHash };
  }

  async passwordMatcher(password: string, encryptedPassword: string) {
    return await bcrypt.compare(password, encryptedPassword);
  }
}
