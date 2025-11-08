import storageService from "../store.js";

export async function createUser({ name }) {
  return await storageService.user.createUser({ name });
}

export async function getUsers() {
  return await storageService.user.getUsers();
}

export async function deleteAllUsers() {
  return await storageService.user.deleteAllUsers();
}
