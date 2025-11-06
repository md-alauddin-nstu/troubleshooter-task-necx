import express from "express";
import cors from "cors";
import { createMessage, createUser, getMessages, getUsers } from "./store.js";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// User routes
app.post("/api/user", async (req, res, next) => {
  console.log(`✔ Request received at ${req.path}`);
  try {
    const { name } = req.body;
    if (!(typeof name === "string" && name.trim() !== "")) {
      console.error("Invalid Data", name);
      throw new Error("Invalid data");
    }

    const newUser = await createUser({ name });
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (e) {
    next(e);
  }
});

app.get("/api/user", async (req, res, next) => {
  console.log(`✔ Request received at ${req.path}`);
  try {
    const users = await getUsers();
    res.status(200).json({ message: "success", data: users });
  } catch (e) {
    next(e);
  }
});

// Message routes
app.post("/api/message", async (req, res, next) => {
  console.log(`✔ Request received at ${req.path}`);
  try {
    const { content, senderId } = req.body;
    if (
      !(
        typeof content === "string" &&
        content.trim() !== "" &&
        typeof senderId === "number" &&
        senderId > 0
      )
    ) {
      throw new Error("Invalid data");
    }

    const newMessage = await createMessage({
      content: content.trim(),
      senderId,
    });

    res
      .status(201)
      .json({ message: "Message created successfully", data: newMessage });
  } catch (e) {
    next(e);
  }
});

app.get("/api/message", async (req, res, next) => {
  console.log(`✔ Request received at ${req.path}`);
  try {
    const messages = await getMessages();
    res.status(200).json({ message: "success", data: messages });
  } catch (e) {
    next(e);
  }
});

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
