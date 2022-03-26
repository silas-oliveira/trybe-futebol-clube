import { User } from "../../interfaces";
import { Service } from "typedi";
import Users from "../../database/models/Users";
import { compareSync } from "bcryptjs";
import { throwEmailOrPasswordError, throwReferenceError } from "./_services";

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
      throwEmailOrPasswordError('Incorrect email or password');
    }
  };

  async login(email: string, password: string): Promise<User | null>  {
    const user = await Users.findOne({ where: { email }, raw: true });
    console.log('user>>><<<>', user);
    if (user === null) return throwEmailOrPasswordError('Incorrect email or password');
    if (!user) return null;
    
    this.comparePassword(password, user.password);
  
    if (user !== null) {
      const { password, ...userInfo } = user;
      return userInfo;
    }
    return user;
  }
}
