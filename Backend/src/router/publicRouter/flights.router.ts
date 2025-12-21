import { Router } from 'express';
import * as controller from '../../controller/public/flights.controller';

const flightsRouter = Router();

flightsRouter.get('/', controller.list);
flightsRouter.get('/:id', controller.getFlightById);

export default flightsRouter;
