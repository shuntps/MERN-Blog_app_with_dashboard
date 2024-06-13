import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

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
