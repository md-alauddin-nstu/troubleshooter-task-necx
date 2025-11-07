import { useUser } from "../hooks/user-hook";
import { Card, CardContent, CardFooter } from "./components/ui/card";
import { cn } from "./lib/utils";

export default function ChatBubble({ content, sender, createdAt }) {
  const { selectedUserId } = useUser();
  return (
    <div
      className={cn(
        "flex",
        sender?.id === selectedUserId ? "justify-end" : "justify-start"
      )}
    >
      <Card
        className={cn(
          "w-max",
          sender?.id === selectedUserId ? " bg-green-600" : ""
        )}
      >
        <CardContent>{content}</CardContent>
        <CardFooter className={"text-xs text-muted-foreground"}>
          {sender && sender.name} . {new Date(createdAt).toLocaleTimeString()}
        </CardFooter>
      </Card>
    </div>
  );
}
