import { Request, Response, NextFunction } from 'express';
import * as service from '../../service/public/room.service';
import { success } from '../../utils/response';

export async function listRoomsByHotel(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const hotelId = req.params.hotelId;
    const rooms = await service.listRooms(req.query, hotelId);
    return success(res, rooms);
  } catch (e) {
    next(e);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const room = await service.getRoomById(req.params.id);
    return success(res, room);
  } catch (e) {
    next(e);
  }
}
