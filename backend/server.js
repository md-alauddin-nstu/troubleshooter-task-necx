import express from "express";
import cors from "cors";
import userRoutes from "./user/user.route.js";
import messageRoutes from "./message/message.route.js";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend server is running successfully!",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Example route structure for candidates
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the NECX Messaging API",
    endpoints: {
      health: "GET /api/health",
      messages: "Get /api/message",
      createMessage: "Post /api/message",
      users: "Get /api/user",
      createUser: "Post /api/user",
    },
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `The route ${req.originalUrl} does not exist on this server`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📍 API base: http://localhost:${PORT}/api`);
});
