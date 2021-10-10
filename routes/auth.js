const express=require("express")
const router=express.Router()
router.get('/',(req,res)=>{
    res.send("get auth state")
})

router.post('/',(req,res)=>{
    res.send("log in user")
})
module.exports=router