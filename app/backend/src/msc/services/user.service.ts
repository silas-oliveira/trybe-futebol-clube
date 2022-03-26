import { User } from "../../interfaces";
import { Service } from "typedi";
import Users from "../../database/models/Users";
import { compareSync } from "bcryptjs";
import { throwEmailOrPasswordError } from "./_services";

@Service()
export class UserService {
  private correctPassword: boolean;
  constructor() {
    this.correctPassword = false;
  }

  private comparePassword = (password: string, hash: string) => {
    console.log(compareSync(password, hash));
    if(compareSync(password, hash) === true) {
      this.correctPassword = true;
    } else {
      throwEmailOrPasswordError();
    }
  };

  async login(email: string, password: string): Promise<User | undefined>  {
    const user = await Users.findOne({ where: { email }, raw: true });
    
    if (user !== null ) {
      const { password: pass, ...userInfo } = user;
      this.comparePassword(password, pass);

      if (user.email === undefined) throwEmailOrPasswordError();
      return userInfo;
    } else {
      throwEmailOrPasswordError();
    }
  }
}
