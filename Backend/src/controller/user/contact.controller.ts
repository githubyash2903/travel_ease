import { Request, Response, NextFunction } from 'express';
import { success } from '../../utils/response';
import { createContactMessageSchema } from '../../validation/user/contact.schema';
import * as service from '../../service/user/contact.service';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = createContactMessageSchema.parse(req.body);
    const userId = (req as any).user?.id ?? null;

    const result = await service.createContactMessage(userId, payload);
    return success(res, result, 'Message sent');
  } catch (e) {
    next(e);
  }
}