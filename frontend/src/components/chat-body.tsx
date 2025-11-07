import { useMessage } from "../hooks/message-hook";
import ChatBubble from "./chat-bubble";
import { MessageContextType, Message } from "../types";

export default function ChatBody() {
  const { messages } = useMessage() as MessageContextType;

  return (
    <div className="chat-body">
      {messages.length > 0 ? (
        messages.map((message: Message) => (
          <ChatBubble
            key={message.id}
            content={message.content}
            sender={message.sender}
            createdAt={message.createdAt}
          />
        ))
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
}
