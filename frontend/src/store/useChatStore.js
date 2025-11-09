import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allUsers: [],
  chats: [],
  isUserLoading: false,
  isChatsLoading: false,

  getAllUsers: async () => {
    try {
      const res = await axiosInstance.get("/user");
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

  sendMessage: async (messageData, user) => {
    // const { chats } = get();

    // const optimisticMessage = {
    //   _id: `temp-${Date.now()}`,
    //   senderId: {
    //     _id: user._id,
    //     fullname: user.fullname,
    //     email: user.email,
    //   },
    //   text: messageData,
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    //   __v: 0,
    // };

    // set({ chats: [...chats, optimisticMessage] });

    try {
      await axiosInstance.post("/messages", { text: messageData });
    } catch (error) {
      // set({ chats: chats.filter((msg) => msg._id !== optimisticMessage._id) });
      console.error("Error sending message:", error);
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.on("newMessage", (newMessage) => {
      const { chats } = get();
      set({ chats: [...chats, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },
}));
