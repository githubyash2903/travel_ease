import { Router } from 'express';
import * as controller from '../../controller/admin/profile.controller';


const profileRouter = Router();

profileRouter.get('/', controller.getProfile);
profileRouter.put('/', controller.updateProfile);

export default profileRouter;
