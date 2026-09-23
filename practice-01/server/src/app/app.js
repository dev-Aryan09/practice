import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/auth.route.js";

const app = express();

// express will read the upcoming input data
app.use(express.json());

// server can read, and manipulate Cookie Storage
app.use(cookieParser());

app.use("/api/auth", authRoutes);

export default app;
