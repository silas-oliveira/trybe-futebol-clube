import Container from "typedi";
import * as express from "express";
import { MatchsController }  from "../msc/controllers";

const matchsRoute = express.Router({ mergeParams: true });
const matchsController = Container.get(MatchsController);

matchsRoute.get("/", async (req, res, next) => {
  try {
    const result = await matchsController.get(req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})

export default matchsRoute;