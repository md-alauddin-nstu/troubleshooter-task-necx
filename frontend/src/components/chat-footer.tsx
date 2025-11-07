import { useState, FormEvent, ChangeEvent } from "react";
import { useToast } from "../hooks/toast-hook";
import { createMessage } from "../apis/message-apis";
import { useUser } from "../hooks/user-hook";
import { useMessage } from "../hooks/message-hook";
import { UserContextType, MessageContextType, ToastContextType } from "../types";

export default function ChatFooter() {
  const [messageText, setMessageText] = useState<string>("");
  const { addMessage } = useMessage() as MessageContextType;
  const { selectedUserId } = useUser() as UserContextType;
  const { setToast } = useToast() as ToastContextType;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedUserId) {
      setToast({ type: "error", message: "Please select a user first" });
      return;
    }

    try {
      const res = await createMessage({
        content: messageText,
        senderId: selectedUserId.toString()
      });
      
      setMessageText("");
      addMessage(res.data);
      setToast({ type: "success", message: "Message sent!" });
    } catch (error) {
      console.error("Failed to send message:", error);
      setToast({ 
        type: "error", 
        message: error instanceof Error ? error.message : "Failed to send message" 
      });
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={messageText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMessageText(e.target.value)}
          disabled={!selectedUserId}
        />
        <button type="submit" disabled={!selectedUserId}>Send</button>
      </form>
    </div>
  );
}
