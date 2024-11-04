import { Router } from "express";
import userRouter from "./userRoutes.js";
import productRoute from "./productRoute.js";
import cartRoute from "./cartRoute.js";
import couponRouter from "./coiponRoute.js";
import paymentRouter from "./paymentRoute.js";
import analyticsRouter from "./analyticsRoute.js"
const appRouter = Router();

// let create routes for app
appRouter.use('/users',userRouter);
appRouter.use('/products',productRoute);
appRouter.use('/carts', cartRoute);
appRouter.use('/cupoon', couponRouter);
appRouter.use('/payment',paymentRouter);
appRouter.use('/analytics',analyticsRouter);


export default appRouter;
