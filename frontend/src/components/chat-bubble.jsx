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
          "w-max mx-2 p-2 gap-2",
          sender?.id === selectedUserId ? " bg-green-800" : ""
        )}
      >
        <CardContent className="px-1 text-sm">{content}</CardContent>
        <CardFooter className={"px-1 text-xs text-muted-foreground"}>
          {sender && sender.name} . {new Date(createdAt).toLocaleTimeString()}
        </CardFooter>
      </Card>
    </div>
  );
}
