import { Request, Response, NextFunction } from 'express';
import { createHolidayPackageSchema, updateHolidayPackageSchema } from '../../validation/holiday/holidayPackage.schema';
import * as service from '../../service/admin/holidayPackage.service';
import { success } from '../../utils/response';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = createHolidayPackageSchema.parse(req.body);
    const pkg = await service.createHolidayPackage(payload);
    return success(res, pkg, 'Holiday package created');
  } catch (e) {
    next(e);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.listHolidayPackages(req.query);
    return success(res, data);
  } catch (e) {
    next(e);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = updateHolidayPackageSchema.parse(req.body);
    await service.updateHolidayPackage(req.params.id, payload);
    return success(res, null, 'Holiday package updated');
  } catch (e) {
    next(e);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deleteHolidayPackage(req.params.id);
    return success(res, null, 'Holiday package deleted');
  } catch (e) {
    next(e);
  }
}

export async function activate(req: Request, res: Response, next: NextFunction) {
  try {
    await service.activateHolidayPackage(req.params.id);
    return success(res, null, 'Holiday package activated');
  } catch (e) {
    next(e);
  }
}

export async function deactivate(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deactivateHolidayPackage(req.params.id);
    return success(res, null, 'Holiday package deactivated');
  } catch (e) {
    next(e);
  }
}
