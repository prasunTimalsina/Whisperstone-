import { getInitials } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

import { useEffect } from "react";

const UserList = () => {
  const { allUsers, getAllUsers } = useChatStore();
  const { onlineUsers, socket } = useAuthStore();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    if (!socket) return;

    // Listen for new users joining
    socket.on("userJoined", (newUser) => {
      useChatStore.setState((state) => ({
        allUsers: [...state.allUsers, newUser],
      }));
    });

    return () => {
      socket.off("userJoined");
    };
  }, [socket]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
      <div className="p-4">
        {/* Active Users */}
        <p className="text-xs font-semibold text-zinc-400 uppercase mb-3">
          Active Users
        </p>
        <div className="space-y-2 mb-6">
          {allUsers
            .filter((u) => onlineUsers.includes(u._id))
            .map((user) => (
              <button
                key={user._id}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                <UserAvatar name={user.fullname} status={"online"} />
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.fullname}
                  </p>
                  <p className="text-xs text-zinc-500 capitalize">Online</p>
                </div>
              </button>
            ))}
        </div>

        {/* Inactive Users */}
        <p className="text-xs font-semibold text-zinc-400 uppercase mb-3">
          Inactive Users
        </p>
        <div className="space-y-2">
          {allUsers
            .filter((u) => !onlineUsers.includes(u._id))
            .map((user) => (
              <button
                key={user._id}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800 transition-colors"
              >
                <UserAvatar name={user.fullname} status={"offline"} />
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-300 truncate">
                    {user.fullname}
                  </p>
                  <p className="text-xs text-zinc-600 capitalize">Offline</p>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

const UserAvatar = ({ name, status }) => {
  const initials = getInitials(name);
  const bgColorClass =
    status === "online"
      ? "bg-emerald-500"
      : status === "away"
      ? "bg-amber-500"
      : "bg-zinc-600";

  return (
    <div
      className={`w-8 h-8 rounded-full ${bgColorClass} flex items-center justify-center flex-shrink-0 text-xs font-semibold text-white border border-white/10`}
    >
      {initials}
    </div>
  );
};

export default UserList;
