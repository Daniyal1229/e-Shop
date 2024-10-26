import { Router } from "express";
import userRouter from "./userRoutes.js";
import productRoute from "./productRoute.js";
const appRouter = Router();

// let create routes for app
appRouter.use('/users',userRouter);
appRouter.use('/products',productRoute);

export default appRouter;
