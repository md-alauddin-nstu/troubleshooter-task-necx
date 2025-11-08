import { access, mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const usersFile = path.join(dataDir, "users.json");
const messagesFile = path.join(dataDir, "messages.json");

async function ensureDataFilesExist() {
  await mkdir(dataDir, { recursive: true });
  try {
    await access(usersFile);
  } catch {
    await writeFile(usersFile, JSON.stringify([], null, 2));
  }
  try {
    await access(messagesFile);
  } catch {
    await writeFile(messagesFile, JSON.stringify([], null, 2));
  }
}

const readJson = async (filePath) => {
  await ensureDataFilesExist();
  const raw = await readFile(filePath, "utf-8");
  if (!raw) {
    return [];
  }
  return JSON.parse(raw);
};

const writeJson = async (filePath, data) => {
  await ensureDataFilesExist();
  await writeFile(filePath, JSON.stringify(data, null, 2));
};

export async function createUser({ name }) {
  const users = await readJson(usersFile);
  console.log("users");
  if (users.some((user) => user.name.toLowerCase() === name.toLowerCase())) {
    throw new Error("User already exist!");
  }
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  await writeJson(usersFile, users);

  return newUser;
}

export async function getUsers() {
  return await readJson(usersFile);
}

export async function deleteAllUsers() {
  await writeJson(usersFile, []);
}

export async function createMessage({ content, senderId }) {
  const messages = await readJson(messagesFile);

  const newMessage = {
    id: messages.length + 1,
    content,
    senderId,
    createdAt: new Date().toISOString(),
  };
  messages.push(newMessage);
  await writeJson(messagesFile, messages);

  return newMessage;
}

export async function getMessages() {
  const messages = await readJson(messagesFile);
  const users = await readJson(usersFile);

  return messages.map((message) => {
    const sender = users.find((user) => user.id === message.senderId);
    return { ...message, sender };
  });
}

export default {
  user: {
    getUsers,
    createUser,
    deleteAllUsers,
  },
  message: {
    getMessages,
    createMessage,
  },
};
