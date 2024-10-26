import jwt from 'jsonwebtoken';
import User from '../models/user.js';
const checkToken = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // const token = req.cookie.accessToken;
        if (!token) {
            return res.status(401).json({ message: "No token provided, access denied" });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);            
            req.user = user;
            next();
        } catch (error) {
            res.status(400).json({ "message":error.message });
        }
    } catch (error) {
        res.status(400).json({"message":error.message})
    }
};

export default checkToken;
