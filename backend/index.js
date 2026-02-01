import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth.routes.js"
import { dbConnect } from "./config/db.js"



dotenv.config()
let port = process.env.PORT || 3000
const app = express()
app.use(express.json())


app.get("/", (req,res)=>{
    res.send("hello world")
})

app.use("/api/auth",authRouter)

app.listen(port,()=>{
    dbConnect()
    console.log(`app is running on ${port}`)
})