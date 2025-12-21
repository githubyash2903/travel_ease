import { Request, Response, NextFunction } from "express";
import * as service from "../../service/public/hotel.service";
import { success } from "../../utils/response";

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    //get hotels
    const hotels = await service.listHotels(_req.query);
    return success(res, hotels);
  } catch (e) {
    next(e);
  }
}

export async function getHotelById(req: Request, res: Response, next: NextFunction) {
  try {
    const hotel = await service.getHotelById(req.params.id);
    return success(res, hotel);
  } catch (e) {
    next(e);
  }
}