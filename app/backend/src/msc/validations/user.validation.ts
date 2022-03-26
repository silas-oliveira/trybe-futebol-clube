import Joi = require("joi");
import { Service } from "typedi";
import { loginInfo } from "../../interfaces";

@Service()
export class UserValidation {
  async bodyAdd(value: any) {
    const schema = Joi.object<loginInfo>({
      email: Joi.string().required().email().messages({
        "any.required": "All fields must be filled",
      }),
      password: Joi.string().required().messages({
        "any.required": "All fields must be filled",
      })
    }).required();
    const result = schema.validateAsync(value);
    return result;
  }
}