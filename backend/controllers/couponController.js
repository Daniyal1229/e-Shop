import Coupon from "../models/cupoon.js";

export const getCoupon = async(req,res,next)=>{
    try {
        const coupon = await Coupon.findOne({userId:req.user._id,isActive:true});
        res.json(coupon || null);
    } catch (error) {
        res.json({"message":error.message});
    }
}

export const validateCoupon = async(req,res,next)=>{
    try {
        const {code} = req.body;
        const coupon = await Coupon.findOne({code:code,userId:req.user._id,isActive:true});
        if(!coupon){
            return res.json({"message":"coupon not found"});
        }
        if (coupon.expirationDate < new Date()) {
            coupon.isActive = false;
            await coupon.save();
            return res.json({"message":"coupon expired"});
        }
        
        res.json({
            "message":"coupon is valid",
            code:coupon.code,
            discountPrecentage:coupon.discountPrecentage
        })
        
    } catch (error) {
        res.json({"message":error.message});
    }
}
