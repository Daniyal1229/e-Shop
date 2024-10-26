import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cartitems:{
        quantity:{
            type:Number,
            default:1
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    },
    role: {
        type: String,
        enum: ["customer", "admin","employee"],
        default: "customer"
    }
},{
    timestamps:true,
})

const User = model('User',userSchema);
export default User;