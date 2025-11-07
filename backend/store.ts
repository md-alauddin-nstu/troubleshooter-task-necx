import { access, mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { User, Message, CreateUserInput, CreateMessageInput, StorageService, MessageWithSender } from "./types.js";

const dataDir = path.join(process.cwd(), "data");
const usersFile = path.join(dataDir, "users.json");
const messagesFile = path.join(dataDir, "messages.json");

async function ensureDataFilesExist() {
  await mkdir(dataDir, { recursive: true });
  try {
    await access(usersFile);
  } catch {
    const defaultUser = { id: 1, name: "Me" };
    await writeFile(usersFile, JSON.stringify([defaultUser], null, 2));
  }
  try {
    await access(messagesFile);
  } catch {
    await writeFile(messagesFile, JSON.stringify([], null, 2));
  }
}

const readJson = async (filePath: string): Promise<any> => {
  const content = await readFile(filePath, "utf-8");
  return JSON.parse(content);
};

const writeJson = async (filePath: string, data: any): Promise<void> => {
  await writeFile(filePath, JSON.stringify(data, null, 2));
};

export async function createUser({ name }: CreateUserInput): Promise<User> {
  const users = await readJson(usersFile) as User[];

  if (users.some((user: User) => user.name.toLowerCase() === name.toLowerCase())) {
    throw new Error("User already exists");
  }

  const newUser: User = {
    id: users.length + 1,
    name,
  };
  users.push(newUser);
  await writeJson(usersFile, users);

  return newUser;
}

export async function getUsers(): Promise<User[]> {
  return await readJson(usersFile) as User[];
}

export async function createMessage({ content, senderId }: CreateMessageInput): Promise<Message> {
  const messages = await readJson(messagesFile) as Message[];

  const newMessage: Message = {
    id: messages.length + 1,
    content,
    senderId,
    createdAt: new Date().toISOString(),
  };
  messages.push(newMessage);
  await writeJson(messagesFile, messages);

  return newMessage;
}

export async function getMessages(): Promise<MessageWithSender[]> {
  const messages = await readJson(messagesFile) as Message[];
  const users = await readJson(usersFile) as User[];

  return messages.map((message: Message) => {
    const sender = users.find((user: User) => user.id === message.senderId);
    return { ...message, sender } as MessageWithSender;
  });
}

export default {
  user: {
    getUsers,
    createUser,
  },
  message: {
    getMessages,
    createMessage,
  },
};
