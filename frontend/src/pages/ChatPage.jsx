import MainChatArea from "@/components/chat/MainChatArea";
import SidebarFooter from "@/components/chat/SidebarFooter";
import SidebarHeader from "@/components/chat/SidebarHeader";
import UserList from "@/components/chat/UserList";

function ChatPage() {
  return (
    <>
      <div className="min-h-screen bg-zinc-950 flex">
        <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col overflow-hidden">
          <SidebarHeader />
          <UserList />
          <SidebarFooter />
        </div>
        <MainChatArea />
      </div>
    </>
  );
}

export default ChatPage;
