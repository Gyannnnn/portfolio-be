require('dotenv').config()
import express from "express";
const app = express();
import cors from "cors"


import authRouter from "./Routes/auth/user.auth";
import portfolioRouter from "./Routes/portfolio/portfolio";
import introductionRouter from "./Routes/introduction/intro.routes";
import aboutPageRouter from "./Routes/about/aboutpage.routes";

app.use(express.json());
app.use(cors())



app.use("/api/v1/auth",authRouter);
app.use("/api/v1/pf",portfolioRouter);
app.use("/api/v1/intro",introductionRouter);
app.use("/api/v1/about",aboutPageRouter)



console.log(process.env.PORT)


app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running at http://localhost${process.env.PORT || 3000}`)
})