import User from '../models/user.js';

export const addToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if product already exists in cart
        const existingCartItem = user.cartitems.find(
            item => item.productId.toString() === productId
        );

        if (existingCartItem) {
            // Update quantity if product exists
            existingCartItem.quantity += quantity;
        } else {
            // Add new product to cart
            user.cartitems.push({
                productId,
                quantity
            });
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            cart: user.cartitems
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding product to cart",
            error: error.message
        });
    }
};

export const getCartItems = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate('cartitems.productId');
        
        res.status(200).json({
            success: true,
            cart: user.cartitems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching cart",
            error: error.message
        });
    }
};

export const removeAllItems = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;

        const user = await User.findById(userId);
        
        user.cartitems = user.cartitems.filter(
            item => item.productId.toString() !== productId
        );

        await user.save();

        res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart: user.cartitems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error removing product from cart",
            error: error.message
        });
    }
};

export const updateQunatity = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        const user = await User.findById(userId);
        
        const cartItem = user.cartitems.find(
            item => item.productId.toString() === productId
        );

        if (cartItem) {
            cartItem.quantity = quantity;
            await user.save();
        }

        res.status(200).json({
            success: true,
            message: "Cart quantity updated",
            cart: user.cartitems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating cart quantity",
            error: error.message
        });
    }
};
