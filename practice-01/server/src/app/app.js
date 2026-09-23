import express from "express";

const app = express();

// express will read the upcoming input data
app.use(express.json());

export default app;
