import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isCheckingAuth: false,
      isSigninUp: false,
      socket: null,
      onlineUsers: [],

      checkAuth: async () => {
        try {
          set({ isCheckingAuth: true });
          const res = await axiosInstance.get("/auth/get-me");
          set({ authUser: res.data.data });
          get().connectSocket();
        } catch (error) {
          console.error("Auth check failed:", error);
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      login: async (data) => {
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data.data });
          toast.success("Logged in successfully!");
          get().connectSocket();
        } catch (error) {
          console.log("Error logging in", error);
        }
      },

      signup: async (data) => {
        try {
          set({ isSigninUp: true });
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data.data });
          toast.success("Signed up successfully!");
          get().connectSocket();
        } catch (error) {
          console.log("Error signing up", error);
        } finally {
          set({ isSigninUp: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully!");
          get().disconnectSocket();
        } catch (error) {
          console.log("Error logging out", error);
        }
      },

      deleteAccount: async () => {
        try {
          await axiosInstance.delete("/user/delete");
          await get().logout();
          toast.success("Account deleted successfully!");
        } catch (error) {
          console.log("Error deleting account", error);
        }
      },

      connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, { withCredentials: true });

        socket.connect();
        set({ socket });

        //listen for online users event
        socket.on("getOnlineUsers", (userId) => {
          set({ onlineUsers: userId });
        });
      },

      disconnectSocket: () => {
        if (get().socket?.connected) get().socket?.disconnect();
        set({ socket: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        authUser: state.authUser,
      }),
    }
  )
);
