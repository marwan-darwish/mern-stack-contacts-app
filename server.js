const express=require("express")
const connectDB = require("./config/db")
const path=require("path")
const app=express()
connectDB()
app.use(express.json({extended:false}))
app.use("/api/users",require("./routes/users"))
app.use("/api/contacts",require("./routes/contacts"))
app.use("/api/auth",require("./routes/auth"))
if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"))
    app.get("*",(req,res)=>
        res.sendFile(path.resolve(__dirname,"client", "build", "index.html"))
    )
}
const PORT=process.env.PORT ||8888

app.listen(PORT,()=>console.log("server started"))