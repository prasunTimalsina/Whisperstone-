import { getInitials } from "@/lib/utils";
import { MoreVertical } from "lucide-react";

const ChatBox = () => {
  const mockMessages = [
    {
      id: 1,
      sender: "Alex Chen",
      message: "Hey everyone! How is everyone doing?",
      time: "10:30 AM",
      userId: "1",
    },
    {
      id: 2,
      sender: "Jordan Smith",
      message: "All good here! Just finished the project",
      time: "10:32 AM",
      userId: "2",
    },
    {
      id: 3,
      sender: "Casey Wilson",
      message: "Great work team! Let's celebrate",
      time: "10:35 AM",
      userId: "3",
    },
    {
      id: 4,
      sender: "Alex Chen",
      message: "Thanks! Next meeting is tomorrow at 2 PM",
      time: "10:38 AM",
      userId: "1",
    },
    {
      id: 5,
      sender: "John Doe",
      message: "Perfect! I'll add it to the calendar",
      time: "10:40 AM",
      userId: "current",
    },
    {
      id: 6,
      sender: "Riley Martinez",
      message: "Count me in!",
      time: "10:42 AM",
      userId: "5",
    },
    {
      id: 7,
      sender: "John Doe",
      message: "See you all tomorrow!",
      time: "10:44 AM",
      userId: "current",
    },
  ];

  const mockUsers = [
    { id: 1, name: "Alex Chen", status: "online" },
    { id: 2, name: "Jordan Smith", status: "online" },
    { id: 3, name: "Casey Wilson", status: "away" },
    { id: 4, name: "Morgan Davis", status: "offline" },
    { id: 5, name: "Riley Martinez", status: "online" },
    { id: 6, name: "Sam Taylor", status: "offline" },
  ];
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-950 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
      {/* Chat messages will be rendered here */}
      {mockMessages.map((msg) => {
        const sender = mockUsers.find((u) => u.name === msg.sender);
        const isCurrentUser = msg.userId === "current";

        if (isCurrentUser) {
          return (
            <div key={msg.id} className="flex gap-3 justify-end group">
              <div className="flex-col items-end max-w-xs">
                <div className="flex items-baseline gap-2 justify-end">
                  <p className="text-xs text-zinc-500">{msg.time}</p>
                </div>
                <div className="mt-1 bg-white text-black rounded-lg px-4 py-2">
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-zinc-800 transition-all text-zinc-500">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          );
        }

        return (
          <div key={msg.id} className="flex gap-3 group">
            <UserAvatar
              name={msg.sender}
              status={sender?.status || "offline"}
            />
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-white text-sm">{msg.sender}</p>
                <p className="text-xs text-zinc-500">{msg.time}</p>
              </div>
              <div className="mt-1 bg-zinc-800 text-zinc-100 rounded-lg px-4 py-2 inline-block">
                <p className="text-sm">{msg.message}</p>
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
