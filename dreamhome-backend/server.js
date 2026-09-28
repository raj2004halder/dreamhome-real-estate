import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();


// ================= MIDDLEWARE =================

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500"
    ],
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DreamHome API is running"
  });
});


// ================= USER ROUTES =================

app.use("/api/users", userRoutes);


// ================= DATABASE =================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });