import ChatBox from "./ChatBox";
import MessageInput from "./MessageInput";
import StatBar from "./StatBar";

const MainChatArea = () => {
  return (
    <div className="flex-1 flex flex-col bg-zinc-950 h-screen">
      <div className="border-b border-zinc-800 bg-zinc-900">
        <div className="px-6 py-4 h-20 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Community Chat</h2>
            <p className="text-xs text-zinc-400">Broadcast messaging</p>
          </div>
        </div>
        {/* Stats Bar */}
        <StatBar />
      </div>
      <ChatBox />
      <MessageInput />
    </div>
  );
};

export default MainChatArea;
