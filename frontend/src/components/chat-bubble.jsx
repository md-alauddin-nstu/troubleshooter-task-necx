import { useUser } from "../hooks/user-hook";

export default function ChatBubble({ content, sender, createdAt }) {
  const { selectedUserId } = useUser();
  const rowClassName =
    selectedUserId === sender?.id ? "chat-row right" : "chat-row left";
  return (
    <div className={rowClassName}>
      <div className="chat-bubble">
        <p className="chat-message">{content}</p>
        <p className="chat-info">
          {sender && sender.name} . {new Date(createdAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
