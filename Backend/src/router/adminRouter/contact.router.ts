import { Router } from 'express';
import * as controller from '../../controller/admin/contact.controller';

const contactRouter = Router();

contactRouter.get('/', controller.list);
contactRouter.get('/:id', controller.getById);

export default contactRouter;
