import { Request, Response, NextFunction } from "express";
import * as service from "../../service/user/hotel.service";
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
