import { Router } from "express";
import checkToken from "../middleware/checkToken.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import checkAdminOrEmployee from "../middleware/checkAdminOrEmployee.js";
import { getAllProducts, addProduct, getFeaturedProducts, deleteProduct, getRecommendationProduct, getProductsByCategory, toggleFeatureProduct, getImage } from "../controllers/productsController.js";
const productRoute = Router();


productRoute.get("/", getAllProducts);
productRoute.post("/", getImage, checkToken, checkAdminOrEmployee, addProduct);
productRoute.delete("/:id",checkToken, deleteProduct);
productRoute.patch("/:id",checkToken,checkAdmin, toggleFeatureProduct);
productRoute.get("/featured", getFeaturedProducts);
productRoute.get("/recommend", getRecommendationProduct);
productRoute.get("/category:category", getProductsByCategory);

export default productRoute;

