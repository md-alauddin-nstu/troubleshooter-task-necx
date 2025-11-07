import { useState } from "react";
import { createUser } from "../apis/user-apis.js";
import { useUser } from "../hooks/user-hook.js";
import { useToast } from "../hooks/toast-hook.js";
export default function ChatHeader() {
  const { users, setUsers, setSelectedUserId } = useUser();
  const { setToast } = useToast();
  const [name, setName] = useState("");

  const handleUserChange = (e) => {
    e.preventDefault();
    const selectedUserId = e.target.value;
    // Handle user selection change
    setSelectedUserId(Number(selectedUserId));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    // Handle create user
    try {
      const res = await createUser({ name });
      console.log("User created:", res.data);
      setUsers((prevUsers) => [...prevUsers, res.data]);
      setName("");
      setToast({ message: "User created successfully.", type: "success" });
    } catch (e) {
      console.error("Failed to create user:", e);
      setToast({
        message: e.message || "Failed to create User",
        type: "error",
      });
    }
  };
  return (
    <div className="">
      <h2>NECX Messaging</h2>
      <div className="">
        <form onSubmit={handleCreateUser}>
          <label htmlFor="users">Sender</label>
          <select name="users" id="users" onChange={handleUserChange}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="username"
            id=""
            placeholder="Create user..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}
