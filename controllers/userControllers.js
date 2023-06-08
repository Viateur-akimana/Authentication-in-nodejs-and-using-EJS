const express = require('express');
const User = require('../model/UserSchema');
const jwt =require('jsonwebtoken')




//handling errors
const handleErrors= (error) =>{
   console.log(error.message,error.code);
   let errors ={email: '',password: ''}
//handling email errors
if(error.email='incorrect email'){
errors.email= 'that email is not registered ';
}
//handle password errors
if(error.password=='incorrect password'){
   errors.password='you password is incorrect ';
}

//duplicating errors
if(error.code ===11000){
errors.email='you entered already registered email';

return errors;
}

//validation errors
if(error.message.includes('user validation failed'))
Object.values(error.error).forEach(({properties})=>{
   errors[properties.path]= properties.message;
})
return errors;

}

const maxAge = 3*24*60*60;
const createtoken = (id)=>{
return jwt.sign({ id },'the secret',{
    expiresIn:maxAge
})
}

const signup_get=(req,res)=>{
    res.render("signup.ejs")
}
const login_get = (req,res)=>{
    res.render("login.ejs");  
}
const signup_post = async (req,res)=>{
 const { email, password } = req.body;
 
 try{
    const user = await User.create({email,password});
    const token = await createtoken(user._id)
    res.cookie('jwt',token,{
      httpOnly:true, maxAge:maxAge
    })
    res.status(200).json(user._id);
    res.redirect('/api/v1/login');
 }catch(error){
    const errors = handleErrors(error)
    res.status(401).json(errors)

 }
 
 
}
const login_post = async (req,res)=>{
    const { email, password } = req.body;

    try {
      const user = await User.login(email,password)
      res.status(200).json({user:user._id})
      
    } catch (error) {
      const errors = handleErrors(error)
     res.status(400).json({errors})
return;
    }

 
}
const logout_get = (req,res)=>{
   res.cookie('jwt',' ',{maxAge:1});
   res.redirect('/api/v1/home')
}
module.exports={
   signup_get,
   signup_post,
   login_get,
   login_post,
   logout_get

}