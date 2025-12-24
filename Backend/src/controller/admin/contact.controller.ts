import { Request, Response, NextFunction } from 'express';
import { success } from '../../utils/response';
import * as service from '../../service/admin/contact.service';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.listMessages(req.query);
    return success(res, data);
  } catch (e) {
    next(e);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.getMessageById(req.params.id);
    return success(res, data);
  } catch (e) {
    next(e);
  }
}
