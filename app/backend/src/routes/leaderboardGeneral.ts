import * as express from "express";
import { LeaderboardGeneralController } from "../msc/controllers/leaderboardGeneral";
import Container from "typedi";

const leaderboardGeneralRoute = express.Router({ mergeParams: true });
const leaderboardGeneralController = Container.get(LeaderboardGeneralController);

leaderboardGeneralRoute.get("/", async (req, res, next) => {
  try {
    const result = await leaderboardGeneralController.get();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default leaderboardGeneralRoute;
