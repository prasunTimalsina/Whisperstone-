import { MessageCircle } from "lucide-react";

const SidebarHeader = () => {
  return (
    <div className="p-4 border-b border-zinc-800">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-black" />
        </div>
        <h1 className="text-lg font-bold text-white">Whisper Stone</h1>
      </div>
    </div>
  );
};

export default SidebarHeader;
