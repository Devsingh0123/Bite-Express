import express from "express"
import dotenv from "dotenv"



dotenv.config()
let port = process.env.PORT || 3000
const app = express()


app.get("/", (req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`app is running on ${port}`)
})