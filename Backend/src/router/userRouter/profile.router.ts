import { Router } from 'express';
import * as controller from '../../controller/user/profile.controller';


const profileRouter = Router();

profileRouter.get('/', controller.getProfile);
profileRouter.put('/', controller.updateProfile);

export default profileRouter;
