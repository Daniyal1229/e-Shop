import { Router } from "express";
import checkToken from "../middleware/checkToken.js";
import { getCoupon, validateCoupon } from "../controllers/couponController.js";

const couponRouter = Router();

couponRouter.get('/',checkToken, getCoupon)
couponRouter.get('/validate',checkToken, validateCoupon)

export default couponRouter;