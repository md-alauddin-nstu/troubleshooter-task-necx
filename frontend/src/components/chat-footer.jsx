import { useState } from "react";
import { useToast } from "../hooks/toast-hook.js";
import { createMessage } from "../apis/message-apis.js";
import { useUser } from "../hooks/user-hook.js";
import { useMessage } from "../hooks/message-hook.js";
import { Button } from "./components/ui/button.jsx";
import { Input } from "./components/ui/input.jsx";
import { Card, CardContent } from "./components/ui/card.jsx";

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
    <Card className={"w-full"}>
      <CardContent >
        <form onSubmit={handleSubmit} className={"w-full flex gap-2"}>
          <Input
            type="text"
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <Button type="submit" className="bg-green-500">
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
