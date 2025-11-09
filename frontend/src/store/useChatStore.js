import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  allUsers: [],
  chats: [],
  isUserLoading: false,
  isChatsLoading: false,

  getAllUsers: async () => {
    try {
      const res = await axiosInstance.get("/user");
      console.log(res.data.data);
      set({ allUsers: res.data.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  getAllChats: async () => {
    set({ isChatsLoading: true });
    try {
      const res = await axiosInstance.get("/messages");
      console.log(res.data.data);
      set({ chats: res.data.data });
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      set({ isChatsLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { chats } = get();
    try {
      const res = await axiosInstance.post("/messages", { text: messageData });
      set({ chats: [...chats, res.data.data] });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },
}));
