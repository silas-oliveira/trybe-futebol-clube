import * as express from "express";
import { LeaderboardController } from "../msc/controllers";
import Container from "typedi";

const leaderboardRoute = express.Router({ mergeParams: true });
const leaderboardController = Container.get(LeaderboardController);

leaderboardRoute.get("/", async (_req, res, next) => {
  try {
    const result = await leaderboardController.get();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})

export default leaderboardRoute;