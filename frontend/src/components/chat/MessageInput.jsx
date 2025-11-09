import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const MessageInput = () => {
  return (
    <div className="p-6 border-t border-zinc-800 bg-zinc-900">
      <div className="flex gap-3">
        <Input
          type="text"
          // onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-600"
        />
        <Button className="bg-white text-black hover:bg-zinc-100 font-semibold">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
