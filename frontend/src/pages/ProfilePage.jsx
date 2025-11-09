import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Save,
  Trash2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProfilePage() {
  const { authUser, updateProfile, deleteAccount } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    fullname: authUser?.fullname || "",
    email: authUser?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.fullname.trim()) return;

    setIsUpdating(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsUpdating(false);
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
    <div className="min-h-screen dark bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Chat
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-black flex items-center justify-center border border-black/20">
              <MessageCircle className="w-3 h-3 text-white" />
            </div>
            <h1 className="text-lg font-bold text-foreground">My Profile</h1>
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Profile Information
          </h2>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-700"
                />
              ) : (
                <p className="text-foreground/70">{authUser?.fullname}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Email Address
              </label>
              {isEditing ? (
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-700"
                />
              ) : (
                <p className="text-foreground/70">{authUser?.email}</p>
              )}
            </div>

            {/* Edit / Save Button */}
            <div className="flex gap-3 pt-4">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    disabled={isUpdating || !formData.fullname.trim()}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        fullname: authUser?.fullname || "",
                        email: authUser?.email || "",
                      });
                    }}
                    variant="outline"
                    className="flex-1 border-zinc-700 text-white hover:bg-zinc-800"
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-white text-zinc-950 hover:bg-zinc-100"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-bold text-red-600 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Delete Account
            </h3>

            <p className="text-foreground/70 text-sm mb-4">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>

            <Button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Account?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Are you sure you want to permanently delete your account? This
              action cannot be undone and all your data will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel className="bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Account
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
