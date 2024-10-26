import jwt from 'jsonwebtoken';

const createToken = (id,email)=>{
    const payload = {id,email};
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"15m"});
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"7d"});
    return {accessToken, refreshToken}
}

export default createToken;