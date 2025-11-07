import { ApiResponse, CreateMessageInput, Message } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function createMessage(message: CreateMessageInput): Promise<ApiResponse<Message>> {
  const response = await fetch(`${API_BASE_URL}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create message");
  }
  return response.json();
}

export async function getMessages(): Promise<ApiResponse<Message[]>> {
  const response = await fetch(`${API_BASE_URL}/api/messages`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get messages");
  }
  return response.json();
}