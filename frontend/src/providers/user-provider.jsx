import { createContext, useState } from "react";
import { getUsers } from "../apis/user-apis";
import { useToast } from "../hooks/toast-hook";
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
  const { setToast } = useToast();

  const refreshUser = async () => {
    try {
      const res = await getUsers();
      setUsers(res);
    } catch (error) {
      setToast({ message: "Failed to refresh users.", type: "error" });
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
