import { Router } from "express";
import checkToken from "../middleware/checkToken.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { checkEmployee } from "../middleware/checkEmployee.js";
import { getAllProducts, addProduct, getFeaturedProducts, deleteProduct, getRecommendationProduct, getProductsByCategory, toggleFeatureProduct, getImage } from "../controllers/productsController.js";
const productRoute = Router();

productRoute.get("/",checkToken,checkAdmin, getAllProducts);
// productRoute.post("/",checkToken,checkAdmin, addProduct);
productRoute.post("/", getImage, checkToken, checkAdmin, addProduct);
productRoute.delete("/:id",checkToken,checkAdmin, deleteProduct);
productRoute.patch("/:id",checkToken,checkAdmin, toggleFeatureProduct);
productRoute.get("/featured", getFeaturedProducts);
productRoute.get("/recommend", getRecommendationProduct);
productRoute.get("/category:category", getProductsByCategory);


export default productRoute;