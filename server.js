const express=require("express")
const app=express()
const PORT=process.env.PORT ||8888
app.get("/",(req,res)=>res.json({msg:"welcome to notes"}))
app.use("/api/users",require("./routes/users"))
app.use("/api/contacts",require("./routes/contacts"))
app.use("/api/auth",require("./routes/auth"))

app.listen(PORT,()=>console.log("server started"))