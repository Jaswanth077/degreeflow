import express from "express";
import cors from "cors";

import studentRoutes from "./routes/student.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 DegreeFlow Backend Running",
  });
});

// Routes
app.use("/api/student", studentRoutes);

export default app;