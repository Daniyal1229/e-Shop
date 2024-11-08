import User from "../models/user.js";
import { compare, hash } from "bcrypt";
import createToken from "../middleware/token.js";

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });
};

export const signup = async (req, res, next) => {
    let { name, email, password } = req.body;
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
        let hashPassword = await hash(password, 12);
        const newUser = await User.create({ name, email, password: hashPassword });
        const { accessToken, refreshToken } = createToken(newUser._id, newUser.email);
        setCookies(res, accessToken, refreshToken);
        res.status(201).json({
            "message": "User created successfully",
            "user":{id:newUser._id,name:newUser.name,email:newUser.email,role:newUser.role},
            "accessToken": accessToken,
            "refreshToken": refreshToken
        });
    } else {
        res.status(400).json({ "message": "User already exists" });
    }
};

export const login = async (req, res, next) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        res.status(404).json({ "message": "User not found" });
    } else {
        const isPasswordMatched = await compare(password, user.password);
        if (!isPasswordMatched) {
            res.status(400).json({ "message": "Invalid password" });
        } else {
            const { accessToken, refreshToken } = createToken(user._id, user.email);
            setCookies(res, accessToken, refreshToken);
            res.status(200).json({
                "message": "Logged in successfully",
                "user":{id:user._id,name:user.name,email:user.email,role:user.role},
                "accessToken": accessToken,
                "refreshToken": refreshToken
            });
        }
    }
};

export const logout = async (req, res, next) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ "message": "Logged out successfully" });
};



export const getProfile = async(req,res,next) =>{
    try {
        res.json(req.user);
    } catch (error) {
        res.json({message:error.message});
    }
}