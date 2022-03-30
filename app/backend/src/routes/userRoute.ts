import * as express from "express";
import Container from "typedi";
import { UserController } from "../msc/controllers";

const userRoute = express.Router({ mergeParams: true });
const userController = Container.get(UserController);

userRoute.post("/", async (req, res, next) => {
  try {
    const result = await userController.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

userRoute.get("/", async (req, res, next) => {
  try {
    const result = await userController.get(req.headers);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default userRoute;
