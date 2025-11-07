import { createContext, useState, ReactNode } from "react";
import { getUsers } from "../apis/user-apis";
import { useToast } from "../hooks/toast-hook";
import { User, UserContextType, ToastContextType } from "../types";

export const UserContext = createContext<UserContextType>({
  selectedUserId: null,
  users: [],
  setSelectedUserId: () => {},
  setUsers: () => {},
  refreshUser: async () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const { setToast } = useToast() as ToastContextType;

  const refreshUser = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : "Failed to refresh users",
        type: "error"
      });
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
