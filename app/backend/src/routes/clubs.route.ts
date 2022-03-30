import * as express from "express";
import { ClubsController }  from "../msc/controllers";
import Container from "typedi";

const clubsRoute = express.Router({ mergeParams: true });
const clubsController = Container.get(ClubsController);

clubsRoute.get("/", async (_req, res, next) => {
  // try {
    const result = await clubsController.get();
    return res.status(200).json(result);
  // } catch (error) {
  //   next(error);
  // }
})

clubsRoute.get("/:id", async (req, res, next) => {
  try {
    const result = await clubsController.getById(req.headers, req.params);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})


export default clubsRoute;