const express = require('express')
const app = express();
const mongoose = require('mongoose')
const userRoutes=require('./routes/userRouters.js')
const cookieParser = require('cookie-parser')
const {ejs}=require('ejs')

//registered middlewares
app.use(express.json());
app.use(cookieParser());
app.set('view engine','ejs')
app.use("/api/v1",userRoutes);


//db connection
const db= 'mongodb://127.0.0.1:27017/users'
mongoose.connect(db,
    {useNewUrlParser: true,
    useUnifiedTopology: true,
      })

.then((result)=>{
    console.log("connected successfully to the database");
})
.catch((err)=>{
    console.log("errror not successfully connected to the database");
}) 

//setting the cookies

// app.get('/set-cookie',(req,res)=>{
    // res.cookie('newUser',false)
    // res.cookie('isEmployee',true ,{maxAge:1000*60*60*24,httpOnly:true });
    // res.send('the first cookie is set')
// })
//reading the cookies
// app.get('/read-cookie',(req,res)=>{
    // const cookies = req.cookies;
    // console.log(cookies);
    // res.send(cookies)
// })
app.get('api/v1/smoothies',(req,res)=>{
    res.render('smoothies')
})
app.get('/',(req,res)=>{
    res.render('home')
})
app.listen(3000,(err)=>{
    if (err) throw err
    console.log("the app is running on the server");
})