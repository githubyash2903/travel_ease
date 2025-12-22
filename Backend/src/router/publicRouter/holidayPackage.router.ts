import { Router } from 'express';
import * as controller from '../../controller/public/holidayPackage.controller';

const holidayPackageRouter = Router();

holidayPackageRouter.get('/', controller.list);
holidayPackageRouter.get('/:id', controller.getHolidayPackageById);

export default holidayPackageRouter;
