const jwt = require('jsonwebtoken')
const User= require('../model/UserSchema')

//reading token from the cookies
const requireAuth =(req,res,next)=>{

const token = req.cookie.jwt;
//verifying the token
if(token){
    jwt.verify(token,'the secret',(err,decodedToken)=>{
        if(err){
            console.log(err.message)
            res.redirect('/api/v1/login')
        }
        else{
            console.log(decodedToken);
            next();
        }
    })
    
}
else{
    res.redirect('/api/v1/login')
}
}

//check users

const checkUser= async (req,res,next)=>{
    //reading the jwt
    const token = req.cookie.jwt;
    
    if(token){
       jwt.verify(jwt,'the secret',{maxAge:1})
       if(err){
         console.log(error);
         res.locals.user= null;
       }
       else{
        console.log(decodedToken);
        const user = await User.findById(decodedToken.id);
        res.locals.user=user;
       }
    }
else{
    console.log(error.message);
    res.locals.user = null
}
}
module.exports={requireAuth,checkUser};