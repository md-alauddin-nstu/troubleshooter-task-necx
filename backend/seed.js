import { access, writeFile } from "fs/promises";
import path from "path";
import { initialUsers } from "./data/initial-data.js";

const dataDir = path.join(process.cwd(), "data");
const usersFile = path.join(dataDir, "users.json");

async function seedData() {
  try {
    // Try to read existing users file
    await access(usersFile);
    const raw = await readFile(usersFile, "utf-8");
    if (!raw) throw new Error("Empty file");
    console.log("Users file exists, skipping seed.");
  } catch {
    // If file doesn't exist or empty, write initial data
    console.log("Seeding initial user data...");
    await writeFile(usersFile, JSON.stringify(initialUsers, null, 2));
    console.log("Users seeded successfully.");
  }
}

seedData().catch(console.error);
