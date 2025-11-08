import { afterAll, beforeAll, describe, expect, it } from "vitest";
import app from "../server.js";
import request from "supertest";
import path from "path";
import { access, mkdir, writeFile } from "fs/promises";
import { initialUsers } from "../data/initial-data.js";

const dataDir = path.join(process.cwd(), "data");
const usersFile = path.join(dataDir, "users.json");
const messagesFile = path.join(dataDir, "messages.json");

const testUser = { name: "Test" };
const testMessage = { content: "Test", senderId: 1 };

async function clearData() {
  await mkdir(dataDir, { recursive: true });
  try {
    await access(usersFile);
  } finally {
    await writeFile(usersFile, JSON.stringify(initialUsers, null, 2));
  }
  try {
    await access(messagesFile);
  } finally {
    await writeFile(messagesFile, JSON.stringify([], null, 2));
  }
}

describe("API Endpoints", () => {
  beforeAll(async () => {
    await clearData();
  });
  afterAll(async () => {
    // delete test data.
    await clearData();
  });

  describe("General and health checks", () => {
    it("should return health status", async () => {
      const res = await request(app).get("/api/health");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("status", "OK");
      expect(res.body).toHaveProperty(
        "message",
        "Backend server is running successfully!"
      );
      expect(res.body).toHaveProperty("timestamp");
      expect(res.body).toHaveProperty("version", "1.0.0");
    });

    it("should return API welcome message and endpoints", async () => {
      const res = await request(app).get("/api");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty(
        "message",
        "Welcome to the NECX Messaging API"
      );
      expect(res.body).toHaveProperty("endpoints");
      expect(res.body.endpoints).toHaveProperty("health", "GET /api/health");
      expect(res.body.endpoints).toHaveProperty("messages", "Get /api/message");
      expect(res.body.endpoints).toHaveProperty(
        "createMessage",
        "Post /api/message"
      );
      expect(res.body.endpoints).toHaveProperty("users", "Get /api/user");
      expect(res.body.endpoints).toHaveProperty("createUser", "Post /api/user");
    });

    it("should return 404 for unknown routes", async () => {
      const res = await request(app).get("/api/unknownroute");
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("error", "Route not found");
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("does not exist on this server")
      );
    });
  });

  describe("User CRUD endpoints", () => {
    it("should create a user", async () => {
      const res = await request(app).post("/api/users").send(testUser);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("message", "User created successfully");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name", testUser.name);
    });

    it("should get all users", async () => {
      const res = await request(app).get("/api/users");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe("Message CRUD endpoints", () => {
    it("should create a message", async () => {
      const res = await request(app).post("/api/messages").send(testMessage);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty(
        "message",
        "Message created successfully"
      );
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("content", testMessage.content);
      expect(res.body.data).toHaveProperty("senderId", testMessage.senderId);
    });

    it("should get All messages", async () => {
      const res = await request(app).get("/api/messages");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });
});
