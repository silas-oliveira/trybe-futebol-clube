import * as express from "express";
import Container from "typedi";
import { UserController } from "../msc/controllers";

const userRoute = express.Router({ mergeParams: true });
const userController = Container.get(UserController);

userRoute.post("/", async (req, res, next) => {
  try {
    const result = await userController.login(req.body);
    console.log("result", result);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default userRoute;
