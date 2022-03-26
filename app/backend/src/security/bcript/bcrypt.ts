import * as bcrypt from 'bcryptjs';

export const createEncrypter = (password: string) => {
  return bcrypt.hash(password, 10);
}

export const compareEncrypter = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
}

