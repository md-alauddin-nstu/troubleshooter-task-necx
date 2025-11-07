import { useState } from "react";
import { createUser } from "../apis/user-apis.js";
import { useUser } from "../hooks/user-hook.js";
import { useToast } from "../hooks/toast-hook.js";
import { Button } from "./components/ui/button.jsx";
import { Input } from "./components/ui/input.jsx";
import { Label } from "./components/ui/label.jsx";
import {
  NativeSelect,
  NativeSelectOption,
} from "./components/ui/native-select.jsx";
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
    <div className="w-full gap-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">NECX Messaging</h2>
      <div className="grow">
        <form
          onSubmit={handleCreateUser}
          className="w-full grow gap-1 flex justify-between"
        >
          {/* Sender selection */}
          <Label htmlFor="users">Sender</Label>
          <NativeSelect
            className="grow w-min"
            name="users"
            id="users"
            onChange={handleUserChange}
          >
            {users.map((user) => (
              <NativeSelectOption
                className="text-black hover:bg-pink-500"
                key={user.id}
                value={user.id}
              >
                {user.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>

          {/* Create user */}
          <Input
            className="w-min grow"
            type="text"
            name="username"
            id=""
            placeholder="Create user..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" className={"bg-green-600"}>
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
