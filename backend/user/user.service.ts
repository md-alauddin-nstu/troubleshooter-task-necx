
import storageService from "../store.js";

interface CreateUserInput {
  name: string;
}

export async function createUser({ name }: CreateUserInput) {
  return await storageService.user.createUser({ name });
}

export async function getUsers() {
  return await storageService.user.getUsers();
}
