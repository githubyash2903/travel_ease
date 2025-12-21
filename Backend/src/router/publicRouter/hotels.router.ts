import { Router } from 'express';
import * as controller from '../../controller/public/hotel.controller';

const hotelRouter = Router();

hotelRouter.get('/', controller.list);
hotelRouter.get('/:id', controller.getHotelById);

export default hotelRouter;
