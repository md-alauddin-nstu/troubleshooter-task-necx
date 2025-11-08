import { UserContext } from "../providers/user-provider";
import { useContext } from "react";

export function useUser() {
  const { users, setUsers, selectedUserId, setSelectedUserId } =
    useContext(UserContext);

  const selectedUser = users.find((user) => user.id === selectedUserId);

  return {
    users,
    setUsers,
    selectedUserId,
    setSelectedUserId,
    selectedUser,
  };
}
