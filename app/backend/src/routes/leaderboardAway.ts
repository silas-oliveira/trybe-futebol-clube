import * as express from 'express';
import { LeaderboardAwayController } from '../msc/controllers';
import Container from "typedi";



const leaderboardAwayRoute = express.Router({ mergeParams: true });
const leaderboardAwayController = Container.get(LeaderboardAwayController);

leaderboardAwayRoute.get('/', async (_req, res, next ) => {
  try {
    const result = await leaderboardAwayController.get();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})

export default leaderboardAwayRoute;