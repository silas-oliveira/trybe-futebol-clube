import { NextFunction } from "express";
import { Service } from "typedi";
import { UserService } from "../services/user.service";
import { UserValidation } from "../validations/user.validation";

import token from "../../security/jwt/create.token";

@Service()
export class UserController {
  constructor (
    readonly userValidation: UserValidation,
    readonly userService: UserService,
  ) {}

  async login(body: any) {
    console.log('controller', body);
    const { email, password } = await this.userValidation.bodyAdd(body);
    const result = await this.userService.login(email, password);
    console.log('result', result);
    const authorization = token(email);
    return { user :{ ...result }, token: authorization };
  }

  async get(headers: any) {
    const { authorization } = headers;
    // console.log('authorization', authorization);
    
    const result = await this.userService.get(authorization);
    return result;
  }
}