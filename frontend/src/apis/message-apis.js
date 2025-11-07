const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function createMessage(message) {
  const res = await fetch(`${API_BASE_URL}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  if (res.status >= 400) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create message");
  }
  return await res.json();
}

export async function getMessages() {
  const res = await fetch(`${API_BASE_URL}/api/messages`);
  if (res.status >= 400) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch messages");
  }
  return await res.json();
}
