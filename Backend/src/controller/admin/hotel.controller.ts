import { Request, Response, NextFunction } from 'express';
import { createHotelSchema, updateHotelSchema } from '../../validation/hotel/hotel.schema';
import * as service from '../../service/admin/hotel.service';
import { success } from '../../utils/response';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = createHotelSchema.parse(req.body);
    const hotel = await service.createHotel(payload);
    return success(res, hotel, 'Hotel created');
  } catch (e) {
    next(e);
  }
}

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    //get hotels
    const hotels = await service.listHotels(_req.query);
    return success(res, hotels);
  } catch (e) {
    next(e);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    // const payload = updateHotelSchema.parse(req.body);
    await service.updateHotel(req.params.id, req.body);
    return success(res, null, 'Hotel updated');
  } catch (e) {
    next(e);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deleteHotel(req.params.id);
    return success(res, null, 'Hotel deleted');
  } catch (e) {
    next(e);
  }
}
export async function activateHotel(req: Request, res: Response, next: NextFunction) {
  try {
    await service.activateHotel(req.params.id);
    return success(res, null, 'Hotel activated');
  } catch (e) {
    next(e);
  }
}
export async function deactivateHotel(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deactivateHotel(req.params.id);
    return success(res, null, 'Hotel deactivated');
  } catch (e) {
    next(e);
  }
}
