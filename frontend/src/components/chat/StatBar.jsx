import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

const StatBar = () => {
  const { chats, allUsers } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const totalMessages = chats.length;
  const totalUsers = allUsers.length;
  const totalOnline = onlineUsers.length;

  return (
    <div className="px-6 py-3 flex gap-6 bg-zinc-800/50 border-t border-zinc-800">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-zinc-400 uppercase">
          Messages
        </span>
        <span className="text-lg font-bold text-white">{totalMessages}</span>
      </div>
      <div className="w-px bg-zinc-700"></div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-zinc-400 uppercase">
          Users
        </span>
        <span className="text-lg font-bold text-white">{totalUsers}</span>
      </div>
      <div className="w-px bg-zinc-700"></div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-zinc-400 uppercase">
          Online
        </span>
        <span className="text-lg font-bold text-emerald-500">
          {totalOnline}
        </span>
      </div>
    </div>
  );
};

export default StatBar;
