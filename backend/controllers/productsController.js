import multer from 'multer';
import Product from "../models/product.js"
import cloudinary from "../config/cloudinary.js";

const upload = multer({ dest: 'uploads/' });


export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ products });
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
}

export const getImage = upload.single('image');

export const addProduct = async (req, res, next) => {
    try {
        const { name, description, price, category } = req.body;
        let cloudinaryResponse = null;
        if (req.file) {
            cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, { folder: "products" });
        }

        const product = await Product.create({
            name, description, price, image: cloudinaryResponse ? cloudinaryResponse.url : "", category
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ "message": "no product with this is" });
        } else {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json({ "message": "product deleted successfully" });
        }
    } catch (error) {
        res.status(400).json({ "message": error.message })
    }
}

export const getFeaturedProducts = async (req, res, next) => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        res.status(200).json({ featuredProducts });
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
}

export const getProductsByCategory = async (req, res, next) => {
    try {
        const category = req.params;
        const categoryProducts = await Product.find({ category }).lean();
        res.status(200).json({ categoryProducts });
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
}

export const getRecommendationProduct = async (req, res, next) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 3 },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ])
        res.json({ product: products })
    } catch (error) {
        res.status(400).json({ "message": error.message })
    }
}

export const toggleFeatureProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.isFeatured = !product.isFeatured;
            const updateProduct = await Product.findByIdAndUpdate(req.params.id, { isFeatured: true });
            res.status(201).json({ "product": updateProduct })
        }
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
}