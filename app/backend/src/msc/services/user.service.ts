import { User } from "../../interfaces";
import { Service } from "typedi";
import Users from "../../database/models/Users";
import { compareSync } from "bcryptjs";
import { throwEmailOrPasswordError } from "./_services";
import decodeToken from "../../security/jwt/decode.token";
import { JwtPayload } from "jsonwebtoken";

@Service()
export class UserService {
  private correctPassword: boolean;
  constructor() {
    this.correctPassword = false;
  }

  private comparePassword = (password: string, hash: string) => {
    if (compareSync(password, hash) === true) {
      this.correctPassword = true;
    } else {
      throwEmailOrPasswordError();
    }
  };

  async login(email: string, password: string): Promise<User | undefined> {
    const user = await Users.findOne({ where: { email }, raw: true });

    if (user !== null) {
      const { password: pass, ...userInfo } = user;
      this.comparePassword(password, pass);

      if (user.email === undefined) throwEmailOrPasswordError();
      return userInfo;
    } else {
      throwEmailOrPasswordError();
    }
  }

  get(authorization: any) {
    const decode = decodeToken(authorization);

    if (decode !== undefined || decode !== null) {
      const { data } = decode as JwtPayload;
      const lowerCase = data.toLowerCase();
      
      if (lowerCase.includes('user')) return 'user';
      if (lowerCase.includes('admin')) return 'admin';
    }
    return undefined;
  }
}
