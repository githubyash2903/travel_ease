import { Router } from 'express';
import hotelRouter from './hotel.router';
import roomRouter from './room.router';
import userRouter from './users.router';
import flightRouter from './flight.router';
import holidayPackageRouter from './holidayPackage.router';
import bookingRouter from './bookings.router';
import profileRouter from './profile.router';
import statsRouter from './stats.router';
import contactRouter from './contact.router';


const adminRouter = Router();

adminRouter.use('/users', userRouter);
adminRouter.use('/profile', profileRouter);
adminRouter.use('/hotels', hotelRouter);
adminRouter.use('/rooms', roomRouter);
adminRouter.use('/flights', flightRouter);
adminRouter.use('/holiday-packages', holidayPackageRouter);
adminRouter.use('/bookings', bookingRouter);
adminRouter.use('/stats', statsRouter);
adminRouter.use('/contact-messages', contactRouter);


export default adminRouter;
