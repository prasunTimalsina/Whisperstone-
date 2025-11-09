const StatBar = () => {
  // Mock data for stats
  const totalMessages = 247;
  const totalUsers = 12;
  const onlineUsers = 8;
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
          {onlineUsers}
        </span>
      </div>
    </div>
  );
};

export default StatBar;
