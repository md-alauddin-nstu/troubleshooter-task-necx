import { useUser } from "../hooks/user-hook";
import { Message } from '../types';

type ChatBubbleProps = {
  content: string;
  sender: Message['sender'];
  createdAt: string;
};

export default function ChatBubble({ content, sender, createdAt }: ChatBubbleProps) {
  const { selectedUserId } = useUser();
  const rowClassName: string =
    selectedUserId === sender?.id ? "chat-row right" : "chat-row left";

  const formattedTime = new Date(createdAt).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className={rowClassName}>
      <div className="chat-bubble">
        <p className="chat-message">{content}</p>
        <p className="chat-info">
          {sender?.name} . {formattedTime}
        </p>
      </div>
    </div>
  );
}
