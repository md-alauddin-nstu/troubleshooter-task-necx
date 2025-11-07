import { useMessage } from "../hooks/message-hook";
import ChatBubble from "./chat-bubble";

export default function ChatBody() {
  const { messages } = useMessage();
  return (
    <div className="chat-body">
      {messages && messages.length > 0 ? (
        messages.map((message) => <ChatBubble key={message.id} {...message} />)
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
}
