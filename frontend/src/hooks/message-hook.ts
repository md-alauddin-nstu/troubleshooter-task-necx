import { useContext } from "react";
import { MessageContext } from "../providers/message-provider";

export function useMessage() {
  const { messages, setMessages, addMessage } = useContext(MessageContext);
  return { messages, setMessages, addMessage };
}
