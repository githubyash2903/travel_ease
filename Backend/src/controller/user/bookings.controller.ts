import { Request, Response, NextFunction } from 'express';
import * as service from '../../service/user/booking.service';
import { success } from '../../utils/response';
import {
  createHotelBookingSchema,
  createFlightBookingSchema,
  createPackageBookingSchema,
} from '../../validation/booking/booking.schema';

export async function createHotelBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const payload = createHotelBookingSchema.parse(req.body);
    const booking = await service.createHotelBooking(userId, payload);
    return success(res, booking, 'Booking requested');
  } catch (e) {
    next(e);
  }
}

export async function createFlightBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const payload = createFlightBookingSchema.parse(req.body);
    const booking = await service.createFlightBooking(userId, payload);
    return success(res, booking, 'Booking requested');
  } catch (e) {
    next(e);
  }
}

export async function createPackageBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const payload = createPackageBookingSchema.parse(req.body);
    const booking = await service.createPackageBooking(userId, payload);
    return success(res, booking, 'Booking requested');
  } catch (e) {
    next(e);
  }
}

export async function listMyBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const rows = await service.listMyBookings(userId);
    return success(res, rows);
  } catch (e) {
    next(e);
  }
}

export async function getMyBookingById(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const row = await service.getMyBookingById(userId, req.params.id);
    return success(res, row);
  } catch (e) {
    next(e);
  }
}
