import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
