import { Request, Response, NextFunction } from "express";
import {
  createRoomSchema,
  updateRoomSchema,
} from "../../validation/room/room.schema";
import * as service from "../../service/admin/room.service";
import { success } from "../../utils/response";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = createRoomSchema.parse(req.body);
    const room = await service.createRoom(payload);
    return success(res, room, "Room created");
  } catch (e) {
    next(e);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const rooms = await service.listRooms(req.query);
    return success(res, rooms);
  } catch (e) {
    next(e);
  }
}
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

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = updateRoomSchema.parse(req.body);
    await service.updateRoom(req.params.id, payload);
    return success(res, null, "Room updated");
  } catch (e) {
    next(e);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deleteRoom(req.params.id);
    return success(res, null, "Room deleted");
  } catch (e) {
    next(e);
  }
}

export async function activateRoom(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await service.activateRoom(req.params.id);
    return success(res, null, "Room activated");
  } catch (e) {
    next(e);
  }
}

export async function deactivateRoom(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await service.deactivateRoom(req.params.id);
    return success(res, null, "Room deactivated");
  } catch (e) {
    next(e);
  }
}
