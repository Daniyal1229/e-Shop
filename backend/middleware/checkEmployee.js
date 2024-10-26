
export const checkEmployee = (req,res,next)=>{
    if(req.user && req.user.role === 'employee'){
        console.log(req.user.role);
        next();
    }else{
        res.status(400).json({"message":"customers are not allowed"})
    }
}