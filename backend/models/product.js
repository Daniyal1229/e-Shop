import { Schema, model } from "mongoose";

let productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        default:""
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    image:{
        type:String,
        required:[true, "image is required"],
    },
    category:{
        type:String,
        required:true
    },
    isFeatured:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


const Product = model("Product",productSchema);

export default Product;