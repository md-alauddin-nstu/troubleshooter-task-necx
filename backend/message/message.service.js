import storageService from "../store.js";

export async function createMessage({ senderId, content }) {
  return await storageService.message.createMessage({ senderId, content });
}

export async function getMessages() {
  return await storageService.message.getMessages();
}
