import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    product:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            },
            price:{
                type:Number,
                require:true,
                min:0
            }
        }
    ],
    totalAmount:{
        type:Number,
        required:true,
        min:0
    },
    stripSessionId:{
        type:String,
        unieqe:true
    }
},{
    timestamps:true
});

const Order = model('Order',orderSchema);

export default Order;