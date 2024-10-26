
export const checkAdmin = (req,res,next)=>{
    if(req.user && req.user.role === 'admin'){
        console.log(req.user.role);
        next()
    }else{
        res.status(400).json({"message":"unauthorised admin only"})
    }
}