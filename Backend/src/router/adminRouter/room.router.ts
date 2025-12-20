import { Router } from 'express';
import * as controller from '../../controller/admin/room.controller';

const roomRouter = Router();

roomRouter.post('/', controller.create);
roomRouter.get('/', controller.list);
roomRouter.get('/:id', controller.getById);
roomRouter.put('/:id', controller.update);
roomRouter.delete('/:id', controller.remove);
roomRouter.post('/activate/:id', controller.activateRoom);
roomRouter.post('/deactivate/:id', controller.deactivateRoom);
roomRouter.get('/hotel/:hotelId', controller.listRoomsByHotel);

export default roomRouter;
