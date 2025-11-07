import { useMessage } from "../hooks/message-hook";
import ChatBubble from "./chat-bubble";
import { Card } from "./components/ui/card";

export default function ChatBody() {
  const { messages } = useMessage();
  return (
    <Card className="p-4">
      {messages && messages.length > 0 ? (
        messages.map((message) => <ChatBubble key={message.id} {...message} />)
      ) : (
        <p>No messages yet.</p>
      )}
    </Card>
  );
}
