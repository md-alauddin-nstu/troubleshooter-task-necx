import { getMessages } from "../apis/message-apis";
import { getUsers } from "../apis/user-apis";
import ChatBody from "../components/chat-body";
import ChatFooter from "../components/chat-footer";
import ChatHeader from "../components/chat-header";
import { useEffect } from "react";
import { useUser } from "../hooks/user-hook";
import { useToast } from "../hooks/toast-hook";
import { useMessage } from "../hooks/message-hook";
import { MessageContextType, UserContextType, ToastContextType } from "../types";

export default function Chat() {
  const { setUsers, setSelectedUserId } = useUser() as UserContextType;
  const { setMessages } = useMessage() as MessageContextType;
  const { setToast } = useToast() as ToastContextType;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, messageRes] = await Promise.all([
          getUsers(),
          getMessages(),
        ]);

        setUsers(userRes.data);
        setSelectedUserId(userRes.data[0]?.id || null);
        setMessages(messageRes.data);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
        setToast({
          type: "error",
          message: error instanceof Error ? error.message : "Failed to load data"
        });
      }
    };

    fetchData();
  }, [setUsers, setSelectedUserId, setMessages, setToast]);

  return (
    <div className="chat-container">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}

