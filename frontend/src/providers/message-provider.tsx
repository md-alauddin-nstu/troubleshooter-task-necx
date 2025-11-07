import { createContext, useState } from "react";
import { useUser } from "../hooks/user-hook";

export const MessageContext = createContext({
  messages: [],
  setMessages: () => {},
  addMessage: () => {},
});

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const { selectedUser } = useUser();

  const addMessage = (message) => {
    console.log("selectedUser in addMessage:", selectedUser);
    message = { ...message, sender: selectedUser };
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        addMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
