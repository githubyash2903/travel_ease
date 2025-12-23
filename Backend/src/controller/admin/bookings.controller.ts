import { Request, Response, NextFunction } from 'express';
import * as service from '../../service/admin/booking.service';
import { success } from '../../utils/response';
import { declineBookingSchema } from '../../validation/booking/booking.schema';

export async function listAllBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await service.listAllBookings(req.query);
    return success(res, rows);
  } catch (e) {
    next(e);
  }
}

export async function getBookingById(req: Request, res: Response, next: NextFunction) {
  try {
    const row = await service.getBookingById(req.params.id);
    return success(res, row);
  } catch (e) {
    next(e);
  }
}

export async function approveBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const adminId = (req as any).user.id;
    await service.approveBooking(adminId, req.params.id);
    return success(res, null, 'Booking approved');
  } catch (e) {
    next(e);
  }
}

export async function declineBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const adminId = (req as any).user.id;
    const payload = declineBookingSchema.parse(req.body);
    await service.declineBooking(adminId, req.params.id, payload.reason);
    return success(res, null, 'Booking declined');
  } catch (e) {
    next(e);
  }
}
