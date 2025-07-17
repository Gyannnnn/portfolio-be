require('dotenv').config()
import express from "express";
const app = express();
import cors from "cors"


import authRouter from "./Routes/auth/user.auth";

app.use(express.json());
app.use(cors())



app.use("/api/v1/auth",authRouter)

console.log(process.env.PORT)


app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running at http://localhost${process.env.PORT || 3000}`)
})