import { Router } from 'express';
import * as controller from '../../controller/admin/holidayPackage.controller';

const holidayPackageRouter = Router();

holidayPackageRouter.post('/', controller.create);
holidayPackageRouter.get('/', controller.list);
holidayPackageRouter.put('/:id', controller.update);
holidayPackageRouter.delete('/:id', controller.remove);
holidayPackageRouter.post('/activate/:id', controller.activate);
holidayPackageRouter.post('/deactivate/:id', controller.deactivate);

export default holidayPackageRouter;
