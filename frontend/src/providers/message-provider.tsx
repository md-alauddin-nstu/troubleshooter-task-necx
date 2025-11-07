import { createContext, useState, ReactNode } from "react";
import { useUser } from "../hooks/user-hook";
import { Message, MessageContextType } from "../types";

export const MessageContext = createContext<MessageContextType>({
  messages: [],
  setMessages: () => {},
  addMessage: () => {},
});

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider = ({ children }: MessageProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { selectedUser } = useUser();

  const addMessage = (message: Message) => {
    if (!selectedUser) return; // no selected sender — ignore or handle upstream

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        ...message,
        sender: selectedUser,
      },
    ]);

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
