import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useChatStore } from "@/store/useChatStore";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { sendMessage } = useChatStore();
  const { authUser } = useAuthStore();

  const handleSendMessage = async () => {
    setSending(true);
    await sendMessage(message, authUser);
    setMessage("");
    setSending(false);
  };
  return (
    <div className="p-6 border-t border-zinc-800 bg-zinc-900">
      <div className="flex gap-3">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-600"
        />
        <Button
          onClick={() => handleSendMessage()}
          disabled={sending}
          className="bg-white text-black hover:bg-zinc-300 font-semibold cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
