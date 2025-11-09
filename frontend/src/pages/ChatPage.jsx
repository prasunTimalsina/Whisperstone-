import MainChatArea from "@/components/chat/MainChatArea";
import SidebarFooter from "@/components/chat/SidebarFooter";
import SidebarHeader from "@/components/chat/SidebarHeader";
import UserList from "@/components/chat/UserList";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { useEffect } from "react";

function ChatPage() {
  const { logout } = useAuthStore();
  const { getAllUser } = useChatStore();

  useEffect(() => {
    getAllUser();
  }, [getAllUser]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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
