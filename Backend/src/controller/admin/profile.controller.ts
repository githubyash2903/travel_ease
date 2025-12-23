import { Request, Response, NextFunction } from 'express';
import * as service from '../../service/admin/profile.service';
import { success } from '../../utils/response';
import { updateProfileSchema } from '../../validation/user/profile.schema';

export async function getProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const profile = await service.getProfile(userId);
    return success(res, profile);
  } catch (e) {
    next(e);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const payload = updateProfileSchema.parse(req.body);

    const updatedProfile = await service.updateProfileName(
      userId,
      payload.name
    );

    return success(res, updatedProfile, 'Profile updated');
  } catch (e) {
    next(e);
  }
}
