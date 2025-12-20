import { Router } from 'express';
import * as controller from '../../controller/admin/users.controller';

const userRouter = Router();

userRouter.get('/', controller.list); // get all users
userRouter.get('/:id', controller.getById); // get specific user
userRouter.post('/deactivate/:id', controller.deactivate); // deactivate user

export default userRouter;
