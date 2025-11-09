import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      authUser: null,
      isCheckingAuth: false,
      isSigninUp: false,

      checkAuth: async () => {
        try {
          set({ isCheckingAuth: true });
          const res = await axiosInstance.get("/auth/get-me");
          set({ authUser: res.data.data });
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
        } catch (error) {
          console.log("Error logging out", error);
        }
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
