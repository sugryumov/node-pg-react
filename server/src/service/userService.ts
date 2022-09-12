import { pool } from "../db";

class UserService {
  async registration(email: string, password: string) {
    const candidate = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );

    if (candidate.rowCount !== 0) {
      throw new Error(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    const user = await pool.query(
      `INSERT INTO users (email, password) VALUES ($1, $2)`,
      [email, password]
    );

    return user;
  }
}

export const userService = new UserService();
