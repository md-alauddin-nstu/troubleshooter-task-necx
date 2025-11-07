import { getMessages } from "../apis/message-apis";
import { getUsers } from "../apis/user-apis";
import ChatBody from "../components/chat-body";
import ChatFooter from "../components/chat-footer";
import ChatHeader from "../components/chat-header";
import { useEffect } from "react";
import { useUser } from "../hooks/user-hook";
import { useToast } from "../hooks/toast-hook";
import { useMessage } from "../hooks/message-hook";

export default function Chat() {
  const { setUsers, setSelectedUserId } = useUser();
  const { setMessages } = useMessage();
  const { setToast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const [userRes, messageRes] = await Promise.all([
          getUsers(),
          getMessages(),
        ]);

        console.log("userRes", userRes);
        console.log("messageRes", messageRes);

        setUsers(userRes.data);
        setSelectedUserId(userRes.data[0]?.id || null);
        setMessages(messageRes.data);
      } catch (e) {
        console.error("Failed to fetch initial data:", e);
        setToast({ message: "Failed to load chat data.", type: "error" });
      }
    })();
  }, []);

  return (
    <div className="page-chat">
      <ChatHeader className="chat-header" />
      <ChatBody />
      <ChatFooter className="chat-footer" />
    </div>
  );
}
