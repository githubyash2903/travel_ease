import { Router } from 'express';
import * as controller from '../../controller/public/room.controller';

const hotelRouter = Router();

hotelRouter.get('/:hotelId', controller.listRoomsByHotel);
hotelRouter.get('/:id', controller.getById);

export default hotelRouter;
