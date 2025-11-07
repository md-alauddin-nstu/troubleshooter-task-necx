import { useState, FormEvent, ChangeEvent } from "react";
import { createUser } from "../apis/user-apis";
import { useUser } from "../hooks/user-hook";
import { useToast } from "../hooks/toast-hook";
import { User, Toast, UserContextType } from "../types";

export default function ChatHeader() {
  const { users, selectedUserId, setSelectedUserId } = useUser() as UserContextType;
  const { setToast } = useToast();
  const [name, setName] = useState<string>("");

  const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSelectedUserId = e.target.value;
    setSelectedUserId(newSelectedUserId ? Number(newSelectedUserId) : null);
  };

  const handleCreateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createUser({ name });
      console.log("User created:", res.data);
      const successToast: Toast = { message: "User created successfully.", type: "success" };
      setToast(successToast);
      setName("");
    } catch (error) {
      console.error("Failed to create user:", error);
      const errorToast: Toast = {
        message: error instanceof Error ? error.message : "Failed to create User",
        type: "error"
      };
      setToast(errorToast);
    }
  };

  return (
    <div className="">
      <h2>NECX Messaging</h2>
      <div className="">
        <form onSubmit={handleCreateUser}>
          <label htmlFor="users">Sender</label>
          <select 
            name="users" 
            id="users" 
            onChange={handleUserChange}
            value={selectedUserId?.toString() ?? ""}
          >
            <option value="">Select a user</option>
            {users.map((user: User) => (
              <option key={user.id} value={user.id.toString()}>
                {user.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Create user..."
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}
