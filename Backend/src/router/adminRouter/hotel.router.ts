import { Router } from 'express';
import * as controller from '../../controller/admin/hotel.controller';

const hotelRouter = Router();

hotelRouter.post('/', controller.create);
hotelRouter.get('/', controller.list);
hotelRouter.put('/:id', controller.update);
hotelRouter.delete('/:id', controller.remove);
hotelRouter.post('/activate/:id', controller.activateHotel);
hotelRouter.post('/deactivate/:id', controller.deactivateHotel);

export default hotelRouter;
