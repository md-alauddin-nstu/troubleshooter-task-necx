import { createContext, useState } from "react";
export const UserContext = createContext({
  selectedUserId: null,
  users: [],
  setSelectedUser: () => {},
  setUsers: () => {},
});

export const UserProvider = ({ children }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        selectedUserId,
        setSelectedUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
