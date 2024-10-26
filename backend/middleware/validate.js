import {body, validationResult} from 'express-validator';

export const validateSignup = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min:6}).withMessage('Password must be of at list 6 characters'),
    (req,res,next)=>{
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({err:err.array()})
        }
        next();
    }
]

export const validateLogin = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min:6}).withMessage('Password should be atleast 6 characters'),
    (req,res,next)=>{
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({err:err.array()})         
        }
        next();
    }
]