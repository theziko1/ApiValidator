import express from "express";
import { config } from "dotenv"
import { connect } from "mongoose";
import userRouter from "./routes/User.js"

config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use("/",userRouter)

connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to the database")
}) 
.catch ((error)=> {
    console.log("connexion failed",error) 
})

app.listen(PORT,()=>{
    console.log(`🚀 ~ server listen ~ in ${PORT} `)   
})