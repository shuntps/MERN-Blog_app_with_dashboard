import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import { errorHandler } from "./utils/error.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
   .connect(process.env.MONGO_URI)
   .then(() => {
      console.log("Connected to MongoDB");

      app.listen(PORT, () => {
         console.log(`Server running on port ${PORT}`);
      });
   })
   .catch((err) => console.log(err));

// Routes Middleware
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Error Middleware
app.use((err, req, res, next) => {
   const statusCode = err.statusCode || 500;
   const message = err.message || "Internal Server Error";
   res.status(statusCode).json({
      success: false,
      statusCode,
      message,
   });
});
