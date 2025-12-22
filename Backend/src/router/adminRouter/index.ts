import { Router } from 'express';
import hotelRouter from './hotel.router';
import roomRouter from './room.router';
import userRouter from './users.router';
import flightRouter from './flight.router';
import holidayPackageRouter from './holidayPackage.router';


const adminRouter = Router();

adminRouter.use('/users', userRouter);
adminRouter.use('/hotels', hotelRouter);
adminRouter.use('/rooms', roomRouter);
adminRouter.use('/flights', flightRouter);
adminRouter.use('/holiday-packages', holidayPackageRouter);

export default adminRouter;
