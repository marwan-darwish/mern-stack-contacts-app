const express=require("express")
const router=express.Router()
router.get('/',(req,res)=>{
    res.send("get all contacts")
})
router.post('/',(req,res)=>{
    res.send("add contact")
})
router.put('/:id',(req,res)=>{
    res.send("update contact")
})
router.delete('/:id',(req,res)=>{
    res.send("delete a contact")
})
module.exports=router