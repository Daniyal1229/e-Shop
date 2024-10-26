import { Router } from "express";
import { validateSignup, validateLogin } from "../middleware/validate.js";
import checkToken from "../middleware/checkToken.js";
import { signup, login, logout, home } from "../controllers/userSignup.js";
const userRouter = Router();

// user routes
userRouter.post('/signup/',validateSignup,signup);
userRouter.post('/login/',validateLogin,login);
userRouter.post('/logout/',logout);

// product routes

// userRouter.post('/home',checkToken,home);


export default userRouter;