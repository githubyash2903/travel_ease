import { Router } from 'express';
import * as controller from '../../controller/admin/hotel.controller';

const hotelRouter = Router();

hotelRouter.get('/', controller.list);
hotelRouter.get('/:id', controller.update);

export default hotelRouter;
