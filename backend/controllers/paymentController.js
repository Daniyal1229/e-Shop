import { stripe } from "../config/stripe.js";
import Coupon from "../models/cupoon.js";
import Order from "../models/order.js"
export const createCheckoutSession = async(req,res)=>{
    try {
        const {products,couponCode} = req.body;
        if(!Array.isArray(products) || products.length === 0){
            return res.json({error:"invalid or empty products"});
        }
        
        let totalAmount = 0;
        
        const lineItems = products.map(product => {
            const amount = Math.round(product.price *100)
            totalAmount += amount * product.quantity
            
            return {
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:product.name,
                        image:[product.image]
                    },
                    unit_amount:amount
                }
            }
        });
        
        let coupon = null;
        if (couponCode) {
            coupon = await Coupon.findOne({code:couponCode,userId:req.user._id,isActive:true});
            if (coupon) {
                totalAmount -= Math.round(totalAmount * coupon.discountPrecentage / 100);
            }
        }
        
        const session  = await stripe.checkout.sessions.create({
            payment_method_types:["card",],
            line_items:lineItems,
            mode:"payment",
            success_url:`${process.env.client_url}/purchase-success?session_id={CHECKOUT_SESSION_ID`,
            cancel_url:`${process.env.client_url}/purchase-cancel`,
            discounts:coupon ? [
                {
                    coupon:await createSrtipeCoupon(coupon.discountPrecentage)
                }
            ]
            : [],
            
            metadata:{
                userId:req.user._id.toString(),
                couponCode:couponCode || "",
                products:JSON.stringify(
                    products.map((p) =>({
                        id:p._id,
                        quantity:p.quantity,
                        price:p.price
                    })) 
                )
            }
        });
        
        if (totalAmount >= 20000) {
            await createNewCoupon(req.user._id);
        }
        
        rea.status(200).json({id:session.id, totalAmount:totalAmount / 100})
        
    } catch (error) {
        console.log(error.message);
        
        res.status(400).json({message:error.message})
    }
}


export const checkoutSuccess = async(req,res) =>{
    try {
        const {sessionId} = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        if(session.payment_status === 'paid'){
            if(session.metadata.couponCode){
                await Coupon.findOneAndUpdate({
                    code:session.metadata.couponCode, userId:session.metadata.userId
                }, {
                    isActive:false
                })
            }
            
            // create a new order
            
            const products = JSON.parse(session.metadata.products);
            const newOrder = new Order({
                user:session.metadata.userId,
                products:products.map(p=> ({
                    product:p.id,
                    qunatity:p.qunatity,
                    price:p.price
                })),
                
                totalAmount:session.amount_total / 100, // convert from cents to dollers
                stripeSessionId:sessionId
            })
            await newOrder.save();
            
            res.status(200).json({
                success:true,
                message:"payment successful, order created, and coupon deactiveted if used",
                orderId:newOrder._id
            })
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message:error.message});
    }
}

async function createSrtipeCoupon(discountPrecentage){
    const coupon = await stripe.coupons.create({
        percent_off:discountPrecentage,
        duration:'once',
    });
    
    return coupon.id;
}
async function createNewCoupon(userId) {
    const newCoupon = new Coupon({
        code:"GIFT" + Math.random().toString(36).substring(2,8).toUpperCase(),
        discountPrecentage:10,
        expirationDate: new Date(Date.now() + 30 *24 * 60 * 60 * 1000), // 30 days from now
        userId:userId
    })
    
    await newCoupon.save();
    return newCoupon
}