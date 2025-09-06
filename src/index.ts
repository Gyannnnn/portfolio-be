require("dotenv").config();
import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./Routes/auth/user.auth";
import portfolioRouter from "./Routes/portfolio/portfolio";
import introductionRouter from "./Routes/introduction/intro.routes";
import aboutPageRouter from "./Routes/about/aboutpage.routes";
import projectPageRouter from "./Routes/projects/projectsPage.routes";
import skillRouter from "./Routes/skill/skill.routes";
import experienceRouter from "./Routes/experience/experience.routes";
import educationRouter from "./Routes/education/education.routes";
import { visitorCountMiddleware } from "./middleware/visitor.middleware";
import analyticsRouter from "./Routes/analytics/analytics.routes";

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://portfolio-be-flame.vercel.app/","https://gyanpatra.dev.iitkirba.xyz/"],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);

app.use(visitorCountMiddleware);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my portfolio backend",
    developer: "@gyanpatra.dev",
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/pf", portfolioRouter);
app.use("/api/v1/intro", introductionRouter);
app.use("/api/v1/about", aboutPageRouter);
app.use("/api/v1/projects", projectPageRouter);
app.use("/api/v1/skillsection", skillRouter);
app.use("/api/v1/experience", experienceRouter);
app.use("/api/v1/education", educationRouter);
app.use("/api/v1/stats", analyticsRouter);

console.log(process.env.PORT);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running at http://localhost:${process.env.PORT || 3000}`
  );
});
