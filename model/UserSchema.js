const mongoose = require('mongoose')
const validator =require('validator')
const bcrypt= require('bcrypt')
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'please enter an valid email address'],
        unique:true,
        minlength:5,
        validate:{
            validator:validator.isEmail,
            message:'invalid email'
        }
      
   },
    password:{
    type: String,
    required:true,
    minlength:10,
    validate:{
        validator:(password)=>{
            return validator.isLength(password,{min:10});
        },
        message:'please enter the password with more 10 charaters'
    }
 }
})
//mongooose hooks
//fire function when data is saved in the database
UserSchema.post('save',function(doc,next){
    console.log('the user is saved to the database',doc);
    next();
})
//fire function when data is about to be saved in the database
UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password,salt)
    next()
})
//use of the statics method to log in

UserSchema.statics.login = async function(email,password){
    const user = await this.findOne({email:email});
    if(user){
      const auth = await bcrypt.compare(password, user.password);
      if(auth){
        return user;
      }
      throw Error('incorrect password')
    }
    throw Error('incorrect email')
}
const User = mongoose.model("user",UserSchema);
module.exports = User;
