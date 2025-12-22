import { Request, Response, NextFunction } from 'express';
import * as service from '../../service/public/holidayPackage.service';
import { success } from '../../utils/response';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.listHolidayPackages(req.query);
    return success(res, data);
  } catch (e) {
    next(e);
  }
}

export async function getHolidayPackageById(req: Request, res: Response, next: NextFunction) {
  try {
    const flight = await service.getHolidayPackageById(req.params.id);
    return success(res, flight);
  } catch (e) {
    next(e);
  }
}