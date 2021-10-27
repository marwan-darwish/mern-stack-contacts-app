const express=require("express")
const router=express.Router()
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const config=require("config")
const auth=require("../middleware/auth")
const User=require("../models/User")

const { body, validationResult, check } = require('express-validator');
router.get('/',auth,async(req,res)=>{
try {
    const user=await User.findById(req.user.id).select("-password")
    res.json(user)
} catch (error) {
    console.log(error.message)
    res.status(500).send("server error")
}
})

router.post('/',[body("email","plz include a valid email").isEmail(),
check("password","password is required").exists()],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
const{email,password}=req.body
try{
    let user=await User.findOne({email})
    if(!user){
        return res.status(400).json({msg:"invalid credentials"})
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({msg:"invalid credentials"})
    }
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
console.log(err.message)
res.status(500).send("server error")
}
    // res.send("log in user")
})
module.exports=router