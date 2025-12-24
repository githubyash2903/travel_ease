import { Router } from 'express';
import * as controller from '../../controller/user/contact.controller';

const contactRouter = Router();
contactRouter.post('/', controller.create);

export default contactRouter;
