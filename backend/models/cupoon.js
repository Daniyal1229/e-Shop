import mongoose, { model, Schema } from "mongoose";


const couponSchema = new Schema({
    code:{
        type:String,
        required:true,
        unique:true
    },
    discountPrecentage:{
        type:Number,
        required:true,
        min:0,
        max:100
    },
    expirationDate:{
        type:Date,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    }
},{
    timestamps:true
})

const Coupon = model('Coupon',couponSchema);

export default Coupon;