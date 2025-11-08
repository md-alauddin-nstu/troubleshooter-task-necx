import { createContext, useState } from "react";
import { getUsers } from "../apis/user-apis";
import { toast } from "sonner";
export const UserContext = createContext({
  selectedUserId: null,
  users: [],
  setSelectedUser: () => {},
  setUsers: () => {},
  refreshUser: async () => {},
});

export const UserProvider = ({ children }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);

  const refreshUser = async () => {
    try {
      const res = await getUsers();
      setUsers(res);
    } catch (error) {
      toast.error("Failed to refresh users");
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        selectedUserId,
        setSelectedUserId,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
