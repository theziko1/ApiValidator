import express from "express";


const app = express()

app.use(express.json())


app.use("/",(req,res)=>{
    res.send("first APi")
})



app.listen(3000,()=>{
    console.log("🚀 ~ server listen ~ in PORT 3000")   
})