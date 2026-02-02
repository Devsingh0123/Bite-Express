import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth.routes.js"
import { dbConnect } from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"



dotenv.config()
let port = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
 
}))


app.get("/", (req,res)=>{
    res.send("hello world")
})

app.use("/api/auth",authRouter)

app.listen(port,()=>{
    dbConnect()
    console.log(`app is running on ${port}`)
})