import { Router } from 'express';
import * as controller from '../../controller/admin/flight.controller';

const flightRouter = Router();

flightRouter.post('/', controller.create);
flightRouter.get('/', controller.list);
flightRouter.put('/:id', controller.update);
flightRouter.delete('/:id', controller.remove);
flightRouter.post('/activate/:id', controller.activateFlight);
flightRouter.post('/deactivate/:id', controller.deactivateFlight);

export default flightRouter;
