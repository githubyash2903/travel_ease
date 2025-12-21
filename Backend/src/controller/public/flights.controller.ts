import { Request, Response, NextFunction } from "express";
import * as service from "../../service/public/flight.service";
import { success } from "../../utils/response";

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    //get flights
    const flights = await service.listFlights(_req.query);
    return success(res, flights);
  } catch (e) {
    next(e);
  }
}

export async function getFlightById(req: Request, res: Response, next: NextFunction) {
  try {
    const flight = await service.getFlightById(req.params.id);
    return success(res, flight);
  } catch (e) {
    next(e);
  }
}