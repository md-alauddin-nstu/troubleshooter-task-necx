import { getMessages } from "../apis/message-apis";
import { getUsers } from "../apis/user-apis";
import ChatBody from "../components/chat-body";
import ChatFooter from "../components/chat-footer";
import ChatHeader from "../components/chat-header";
import { useEffect } from "react";
import { useUser } from "../hooks/user-hook";
import { useMessage } from "../hooks/message-hook";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/components/ui/card";
import { toast } from "sonner";

export default function Chat() {
  const { setUsers, setSelectedUserId } = useUser();
  const { setMessages } = useMessage();

  useEffect(() => {
    (async () => {
      try {
        const [userRes, messageRes] = await Promise.all([
          getUsers(),
          getMessages(),
        ]);

        console.log("userRes", userRes);
        console.log("messageRes", messageRes);

        setUsers(userRes.data);
        setSelectedUserId(userRes.data[0]?.id || null);
        setMessages(messageRes.data);
      } catch (e) {
        console.error("Failed to fetch initial data:", e);
        toast.error("Failed to fetch initial data");
      }
    })();
  }, []);

  return (
    <Card className="my-4 h-[80vh] gap-2 rounded-xl flex flex-col">
      <CardHeader >
        <ChatHeader />
      </CardHeader>
      <CardContent className="w-full flex flex-col flex-1 h-full overflow-hidden">
        <ChatBody />
      </CardContent>
      <CardFooter>
        <ChatFooter />
      </CardFooter>
    </Card>
  );
}
