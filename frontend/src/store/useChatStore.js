import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useChatStore = create((set) => ({
  allUsers: [],
  chats: [],
  isUserLoading: false,
  isChatsLoading: false,

  getAllUser: async () => {
    try {
      const res = await axiosInstance.get("/user");
      console.log(res.data.data);
      set({ allUsers: res.data.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
}));
