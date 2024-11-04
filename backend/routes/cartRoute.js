import {Router} from 'express';
import checkToken from '../middleware/checkToken.js';
import { addToCart, removeAllItems, getCartItems, updateQunatity } from '../controllers/cartController.js';
const cartRoute = Router();

cartRoute.get("/", checkToken, getCartItems);
cartRoute.post("/", checkToken, addToCart);
cartRoute.delete("/", checkToken, removeAllItems);
cartRoute.put("/:id", checkToken, updateQunatity);

export default cartRoute;