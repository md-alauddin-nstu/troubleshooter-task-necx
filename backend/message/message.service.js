import storageService from "../store.js";

export async function createMessage({ userId, content }) {
  return await storageService.message.createMessage({ userId, content });
}

export async function getMessages() {
  return await storageService.message.getMessages();
}
