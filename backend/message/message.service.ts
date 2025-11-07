
import storageService from "../store.js";

import { CreateMessageInput } from "../types.js";

export async function createMessage({ content, senderId }: CreateMessageInput) {
  return await storageService.message.createMessage({ content, senderId });
}

export async function getMessages() {
  return await storageService.message.getMessages();
}
