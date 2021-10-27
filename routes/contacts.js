const express=require("express")
const router=express.Router()
const auth=require("../middleware/auth")
const { body, validationResult } = require('express-validator');
const User=require("../models/User")
const Contact=require("../models/Contact")

router.get('/',auth,async(req,res)=>{
try {
    const contacts=await Contact.find({user:req.user.id}).sort({date:-1})
    res.json(contacts)
} catch (error) {
 console.log(error)
 res.status(500).json("server error")   
}
})

router.post('/',[auth,[body("name","name is required").not().isEmpty()]],async(req,res)=>{
const errors=validationResult(req)
if(!errors.isEmpty()){

    // return res.status(400).json({errors:errors.array()})
    return res.status(400).send("please fill all fields")

}
const{name,email,phone,type }=req.body
try {
    const newcontact=new Contact({
        name,email,phone,type,user:req.user.id
    })
    const contact=await newcontact.save()
    res.json(contact)
} catch (error) {
    console.log(error.message)
    res.status(500).send("server error")
}
})
router.put('/:id',auth,async(req,res)=>{
    const {name,email,phone,type}=req.body
    const contactFields={}
    if(name) contactFields.name=name
    if(email) contactFields.email=email
    if(phone) contactFields.phone=phone
    if(type) contactFields.type=type
    try {
        let contact=await Contact.findById(req.params.id)
        if(!contact){
            return res.status(404).json({msg:"contact not found"})
        }
        if(contact.user.toString()!==req.user.id){
return res.status(401).json({msg:"not authorized"})
        }
        contact=await Contact.findByIdAndUpdate(req.params.id,{
            $set:contactFields},
            {new:true}
        )
        res.json(contact)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("server error")
    }

})
router.delete('/:id',auth,async(req,res)=>{
    try {
        let contact=await Contact.findById(req.params.id)
        if(!contact){
            return res.status(404).json({msg:"contact not found"})
        }
        if(contact.user.toString()!==req.user.id){
return res.status(401).json({msg:"not authorized"})
        }
     await Contact.findByIdAndRemove(req.params.id)
        res.json("contact removed")
    } catch (error) {
        console.log(error.message)
        res.status(500).send("server error")
    }
})
module.exports=router