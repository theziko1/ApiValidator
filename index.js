import express from "express";


const app = express()

app.use(express.json())



app.listen(3000,()=>{
    console.log("🚀 ~ server listen ~ in PORT 3000")   
})