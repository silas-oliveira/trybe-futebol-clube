import Container from "typedi";
import * as express from "express";
import { MatchsController }  from "../msc/controllers";

const matchsRoute = express.Router({ mergeParams: true });
const matchsController = Container.get(MatchsController);

matchsRoute.patch("/:id/finish", async (req, res, next) => {
  try {
    const result = await matchsController.editInProgress(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
})

matchsRoute.patch("/:id", async (req, res, next) => {
  try {
    const result = await matchsController.editByFinished(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
})

matchsRoute.get("/", async (req, res, next) => {
  try {
    const result = await matchsController.get(req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})

matchsRoute.post("/", async (req, res, next) => {
  try {
    const result = await matchsController.create(req.body, req.headers);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})


export default matchsRoute;