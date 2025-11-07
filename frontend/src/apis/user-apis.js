const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function createUser(user) {
  const res = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (res.status >= 400) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create user");
  }
  return await res.json();
}

export async function getUsers() {
  const res = await fetch(`${API_BASE_URL}/api/users`);
  if (res.status >= 400) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch users");
  }
  return await res.json();
}
