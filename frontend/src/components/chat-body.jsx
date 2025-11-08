import { useMessage } from "../hooks/message-hook";
import ChatBubble from "./chat-bubble";
import { Card } from "./components/ui/card";

export default function ChatBody() {
  const { messages } = useMessage();
  return (
    <Card className="flex-1 overflow-x-hidden overflow-y-auto">
      {messages && messages.length > 0 ? (
        messages.map((message) => <ChatBubble key={message.id} {...message} />)
      ) : (
        <p className="w-full text-center text-muted-foreground"> No messages yet </p>
      )}
    </Card>
  );
}
