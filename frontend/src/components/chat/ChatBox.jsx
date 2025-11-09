import { formatMongoDate, getInitials } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { MoreVertical } from "lucide-react";
import { useEffect, useRef } from "react";
import PageLoader from "../PageLoader";

const ChatBox = () => {
  const {
    chats,
    getAllChats,
    isChatLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const chatContainerRef = useRef(null);

  // ✅ Auto scroll when chats change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    getAllChats();
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }, [getAllChats, subscribeToMessages, unsubscribeFromMessages]);

  if (isChatLoading) {
    return <PageLoader />;
  }

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-950 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 "
    >
      {/* Chat messages will be rendered here */}
      {chats.map((msg) => {
        const isCurrentUser = msg.senderId._id === authUser._id;

        if (isCurrentUser) {
          return (
            <div key={msg._id} className="flex gap-3 justify-end group">
              <div className="flex-col items-end max-w-xs">
                <div className="flex items-baseline gap-2 justify-end">
                  <p className="text-xs text-zinc-500">
                    {formatMongoDate(msg.createdAt).time}
                  </p>
                </div>
                <div className="mt-1 bg-white text-black rounded-lg px-4 py-2">
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-zinc-800 transition-all text-zinc-500">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          );
        }

        return (
          <div key={msg._id} className="flex gap-3 group">
            <UserAvatar name={msg.senderId.fullname} status={"offline"} />
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-white text-sm">
                  {msg.senderId.fullname}
                </p>
                <p className="text-xs text-zinc-500">
                  {formatMongoDate(msg.createdAt).time}
                </p>
              </div>
              <div className="mt-1 bg-zinc-800 text-zinc-100 rounded-lg px-4 py-2 inline-block">
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
            <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-zinc-800 transition-all text-zinc-500">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        );
      })}
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

export default ChatBox;
