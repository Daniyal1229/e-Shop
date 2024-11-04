import { Router } from "express";
import checkToken from "../middleware/checkToken.js";
import { createCheckoutSession } from "../controllers/paymentController.js";
const paymentRouter = Router();


paymentRouter.post('/create-checkout-session',checkToken,createCheckoutSession);
paymentRouter.post('/create-success',checkToken,)





export default paymentRouter;

