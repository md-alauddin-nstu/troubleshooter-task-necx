import { useState } from "react";
import { useToast } from "../hooks/toast-hook.js";
import { createMessage } from "../apis/message-apis.js";
import { useUser } from "../hooks/user-hook.js";
import { useMessage } from "../hooks/message-hook.js";

export default function ChatFooter() {
  const [messageText, setMessageText] = useState("");
  const { addMessage } = useMessage();
  const { selectedUserId } = useUser();
  const { setToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assume createMessage is imported from message-apis.js
      const res = await createMessage({
        content: messageText,
        senderId: selectedUserId,
      });
      setMessageText("");
      addMessage(res.data);
      setToast({ type: "success", message: "Message sent!" });
      console.log("Message sent:", messageText);
    } catch (error) {
      console.error("Failed to send message:", error);
      setToast({ type: "error", message: error.message });
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
