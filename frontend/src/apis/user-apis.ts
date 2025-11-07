import { ApiResponse, CreateUserInput, User } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function createUser(
  user: CreateUserInput
): Promise<ApiResponse<User>> {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create user");
  }

  return response.json();
}

export async function getUsers(): Promise<ApiResponse<User[]>> {
  const response = await fetch(`${API_BASE_URL}/api/users`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get users");
  }
  return response.json();
}
