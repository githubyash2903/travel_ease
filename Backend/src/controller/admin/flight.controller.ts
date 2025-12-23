import { Request, Response, NextFunction } from 'express';
import { createFlightSchema, updateFlightSchema } from '../../validation/flight/flight.schema';
import * as service from '../../service/admin/flight.service';
import { success } from '../../utils/response';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = createFlightSchema.parse(req.body);
    const flight = await service.createFlight(payload);
    return success(res, flight, 'Flight created');
  } catch (e) {
    next(e);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const adminId = (req as any).user.id;
    console.log(adminId)
    const flights = await service.listFlights(req.query);
    return success(res, flights);
  } catch (e) {
    next(e);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = updateFlightSchema.parse(req.body);
    await service.updateFlight(req.params.id, payload);
    return success(res, null, 'Flight updated');
  } catch (e) {
    next(e);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deleteFlight(req.params.id);
    return success(res, null, 'Flight deleted');
  } catch (e) {
    next(e);
  }
}

export async function activateFlight(req: Request, res: Response, next: NextFunction) {
  try {
    await service.activateFlight(req.params.id);
    return success(res, null, 'Flight activated');
  } catch (e) {
    next(e);
  }
}

export async function deactivateFlight(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deactivateFlight(req.params.id);
    return success(res, null, 'Flight deactivated');
  } catch (e) {
    next(e);
  }
}
