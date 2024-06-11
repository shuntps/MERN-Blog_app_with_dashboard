import express from "express";

const app = express();

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});