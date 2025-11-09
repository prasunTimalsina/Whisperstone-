import { getInitials } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { ChevronDown, Delete, LogOut, User } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SidebarFooter = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { authUser, logout, deleteAccount } = useAuthStore();

  const handleLogout = async () => {
    // Implement logout functionality here
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
    } catch (error) {
      console.error("Delete account failed:", error);
    }
  };

  return (
    <div className="p-4 border-t border-zinc-800 relative">
      <button
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center border border-zinc-600 font-semibold text-white">
          {getInitials(authUser.fullname)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">You</p>
          <p className="text-xs text-emerald-500">Online</p>
        </div>
        <ChevronDown className="w-4 h-4 text-zinc-500" />
      </button>

      {showProfileMenu && (
        <div className="absolute bottom-20 left-4 right-4 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-50">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-zinc-700 rounded-t-lg transition-colors">
                <Delete className="w-4 h-4" />
                Delete Account
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-900 border-zinc-700 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-zinc-400">
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-zinc-700 rounded-b-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarFooter;
