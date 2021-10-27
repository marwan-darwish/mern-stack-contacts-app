const express=require("express")
const router=express.Router()
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const config=require("config")

const { body, validationResult } = require('express-validator');
const User=require("../models/User")
router.post('/',[body("name","name is required")
.not()
.isEmpty(),
body("email","email must be valid").isEmail(),
body("password","please enter a valid password").isLength({min:6})
],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }

    const{name,email,password}=req.body
    try{
let user=await User.findOne({email})
if(user){
    return res.status(400).json({msg:"email already registred"})
}
user=new User({name,email,password})
const salt=await bcrypt.genSalt(10)
user.password=await bcrypt.hash(password,salt)
await user.save()
const payload={
    user:{
        id:user.id
    }
  
}
jwt.sign(payload,config.get("jwtSecret"),{
    expiresIn:36000
},(err,token)=>{
    if(err) throw err
    res.json({token})
})
} catch(err){
console.log(err.message);
res.status(500).json({msg:"server error"})
    }
})
module.exports=router