import * as bcrypt from 'bcrypt';

export class CommonUtil {
  generatePasswordHash(plainTextPassword: string, salt = 10) {
    return bcrypt.hashSync(plainTextPassword, salt);
  }

  isPasswordValid(plainTextPassword: string, hashedPassword: string) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }
}
