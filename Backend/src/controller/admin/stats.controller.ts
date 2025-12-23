import { Request, Response, NextFunction } from "express";
import * as service from "../../service/admin/stats.service";
import { success } from "../../utils/response";

export async function getStats(_req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await service.getAdminStats();
    return success(res, stats);
  } catch (e) {
    next(e);
  }
}
