import { useAuthStore } from "@/store/useAuthStore";

function ChatPage() {
  const { logout } = useAuthStore();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with logout */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Chat Room</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Chat content area */}
      <div className="p-6">
        <p className="text-muted-foreground">Chat content will go here...</p>
      </div>
    </div>
  );
}

export default ChatPage;
